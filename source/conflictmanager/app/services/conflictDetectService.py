from flask import jsonify
from datetime import datetime, timedelta  # Add timedelta here
import json
import os
from botocore.exceptions import ClientError
import boto3
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import schedule
from ortools.sat.python import cp_model
import itertools
import networkx as nx
from app import app
from dotenv import load_dotenv
from app.services.mongoDBconfig import get_all_schedules_from_db as get_schedules, get_all_optimal_schedules_from_db

load_dotenv()

def write_mock_data_to_csv(MockDataTables):
    assets_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'assets')
    os.makedirs(assets_dir, exist_ok=True)
    df = pd.DataFrame(MockDataTables)
    csv_path = os.path.join(assets_dir, 'mock_data.csv')
    df.to_csv(csv_path, index=False)
    app.logger.info(f"Mock data written to CSV at: {csv_path}")

def conflict_detect_service_with_mock_data():
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    app.logger.debug(f"JSON file path: {json_file_path}")
    with open(json_file_path, "r", encoding="utf-8") as file:
        MockDataTables = json.load(file)
    write_mock_data_to_csv(MockDataTables)
    data = MockDataTables
    G = nx.Graph()
    for entry in data:
        G.add_node(entry['tableId'], **entry)
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            session1 = data[i]
            session2 = data[j]
            time_conflict = not (session1['endTime'] <= session2['startTime'] or session2['endTime'] <= session1['startTime'])
            instructor_conflict = session1['instructorId'] == session2['instructorId']
            students1 = {s['userId'] for s in session1['students']}
            students2 = {s['userId'] for s in session2['students']}
            student_conflict = len(students1 & students2) > 0
            course_conflict = session1['courseId'] == session2['courseId']
            if time_conflict and (instructor_conflict or student_conflict or course_conflict):
                G.add_edge(session1['tableId'], session2['tableId'])
    coloring = nx.coloring.greedy_color(G, strategy="largest_first")
    for table_id, color in coloring.items():
        app.logger.debug(f"Table {table_id} -> Timeslot Group {color}")
    if data:
        return jsonify({"message": "Conflict detected"}), 200
    else:
        return jsonify({"error": "No data found"}), 404

def test_algo_library_schedule():
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    with open(json_file_path, "r") as file:
        data = json.load(file)
    for entry in data:
        start_time = datetime.fromtimestamp(entry["startTime"])
        formatted_time = start_time.strftime("%H:%M")
        schedule.every().day.at(formatted_time).do(
            lambda e=entry: app.logger.debug(f"Session {e['tableId']} at {formatted_time}")
        )
    jobs = schedule.get_jobs()
    return jsonify({"message": f"Scheduled {len(jobs)} sessions", "jobs": [str(job) for job in jobs]}), 200

def test_algo_library_ortools():
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    with open(json_file_path, "r") as file:
        data = json.load(file)
    model = cp_model.CpModel()
    sessions = {entry["tableId"]: entry for entry in data}
    max_timeslots = len(data)
    timeslot_vars = {tid: model.NewIntVar(0, max_timeslots - 1, tid) for tid in sessions}
    for i in sessions:
        for j in sessions:
            if i != j and sessions[i]["instructorId"] == sessions[j]["instructorId"]:
                model.Add(timeslot_vars[i] != timeslot_vars[j])
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    result = {}
    if status == cp_model.FEASIBLE:
        for tid in timeslot_vars:
            result[tid] = solver.Value(timeslot_vars[tid])
        return jsonify({"message": "Schedule found successfully", "status": "FEASIBLE", "schedule": result}), 200
    else:
        return jsonify({"message": "No feasible schedule found", "status": "INFEASIBLE"}), 404

def get_all_schedules_from_db():
    try:
        schedules = get_schedules()
        return {"message": "Schedules fetched successfully", "schedules": schedules}, 200
    except Exception as e:
        return {"message": f"Error fetching schedules: {str(e)}", "schedules": []}, 500
    
def create_graph(conflicts):
    graph = {}
    for conflict in conflicts:
        sessions = conflict["sessions"]
        for i in range(len(sessions)):
            for j in range(i + 1, len(sessions)):
                graph.setdefault(sessions[i], set()).add(sessions[j])
                graph.setdefault(sessions[j], set()).add(sessions[i])
    app.logger.debug(f"Conflict Graph: {graph}")
    return graph

def generate_schedules(graph, data, num_schedules=5):
    model = cp_model.CpModel()
    slots = {}
    max_slot = 15 - 1  # 3 slots/day (8-5 PM), 5 days/week
    for session in graph:
        slots[session] = model.NewIntVar(0, max_slot, f"slot_{session}")
    for session, conflicts in graph.items():
        for conflict in conflicts:
            if conflict in slots:
                model.Add(slots[session] != slots[conflict])
    solver = cp_model.CpSolver()
    solver.parameters.linearization_level = 0
    solver.parameters.enumerate_all_solutions = True
    solver.parameters.max_time_in_seconds = 10.0
    class ScheduleSolutionPrinter(cp_model.CpSolverSolutionCallback):
        def __init__(self, slots, limit):
            cp_model.CpSolverSolutionCallback.__init__(self)
            self._slots = slots
            self._solutions = []
            self._solution_limit = limit
            self._solution_count = 0
        def on_solution_callback(self):
            self._solution_count += 1
            solution = {session: self.Value(slot) for session, slot in self._slots.items()}
            self._solutions.append(solution)
            app.logger.debug(f"Solution {self._solution_count}: {solution}")
            if self._solution_count >= self._solution_limit:
                app.logger.debug(f"Stopping search after {self._solution_limit} solutions")
                self.StopSearch()
        def get_solutions(self):
            return self._solutions
    solution_limit = num_schedules
    solution_printer = ScheduleSolutionPrinter(slots, solution_limit)
    status = solver.Solve(model, solution_printer)
    solutions = solution_printer.get_solutions()
    app.logger.debug(f"Found {len(solutions)} solutions")
    app.logger.debug(f"Solver Status: {solver.StatusName(status)}")
    return solutions

def assign_time_slots(slot_number, base_date):
    days = slot_number // 3
    slot_in_day = slot_number % 3
    start_time = base_date + timedelta(days=days, hours=slot_in_day * 3)
    end_time = start_time + timedelta(hours=3)
    return int(start_time.timestamp()), int(end_time.timestamp())

def gen_optimal_solution_for_schedules(schedules, data):
    optimal_collection = []
    base_date = datetime(2025, 4, 7, 8, 0, 0)  # Monday, April 7, 2025, 8 AM
    updated_data = data.copy()
    conflict_ids = set()
    for schedule in schedules:
        for session_id in schedule.keys():
            conflict_ids.add(session_id)
    updated_data = [item for item in updated_data if item["tableId"] not in conflict_ids]
    for i, schedule in enumerate(schedules):
        formatted_schedule = []
        for session_id, slot in schedule.items():
            session_data = next((item for item in data if item["tableId"] == session_id), None)
            if session_data:
                start_time, end_time = assign_time_slots(slot, base_date)
                session_data["assignedSlot"] = slot
                session_data["startTime"] = start_time
                session_data["endTime"] = end_time
                formatted_schedule.append(session_data)
                if not any(d["tableId"] == session_id for d in updated_data):
                    updated_data.append(session_data.copy())
        optimal_collection.append({
            "schedule_id": f"OPTIMAL_{i+1}",
            "sessions": formatted_schedule
        })
    app.logger.debug(f'Inserting optimal schedules into MongoDB: {json.dumps(optimal_collection, indent=4)}')
    app.logger.info(f"Updated data with resolved schedules: {json.dumps(updated_data, indent=4)}")
    return optimal_collection


# get the all schedules from the database and insert the optimal solution into the database
def get_all_optimal_schedules_from_db():
    try:
        schedules = get_all_optimal_schedules_from_db()
        return {"message": "Schedules fetched successfully", "schedules": schedules}, 200
    except Exception as e:
        return {"message": f"Error fetching schedules: {str(e)}", "schedules": []}, 500

