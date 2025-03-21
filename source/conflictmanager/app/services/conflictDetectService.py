from flask import jsonify
from datetime import datetime
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

load_dotenv()

def write_mock_data_to_csv(MockDataTables):
    # Create assets directory if it doesn't exist
    assets_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'assets')
    os.makedirs(assets_dir, exist_ok=True)
    
    # Convert the data to a DataFrame
    df = pd.DataFrame(MockDataTables)
    
    # Write to CSV
    csv_path = os.path.join(assets_dir, 'mock_data.csv')
    df.to_csv(csv_path, index=False)
    app.logger.info(f"Mock data written to CSV at: {csv_path}")


def conflict_detect_service_with_mock_data():
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    
    app.logger.debug(f"JSON file path: {json_file_path}")

    # Load the JSON data
    with open(json_file_path, "r", encoding="utf-8") as file:
        MockDataTables = json.load(file)
        
    # Write MockDataTables to CSV
    write_mock_data_to_csv(MockDataTables)

    # Now you can use MockDataTables as a Python dictionary
    # app.logger.debug(json.dumps(MockDataTables, indent=4))

    # data = jsonify(MockDataTables)
    
    # Load the dataset (replace with actual JSON input)
    data = MockDataTables  # Place your dataset here

    # tables_csv_data = pd.read_csv(os.path.abspath(os.environ.get("MOCK_DATA_CSV_PATH")))
    # df = pd.DataFrame(tables_csv_data)
    # app.logger.info(df)
    
    # courses = df['courseId'].unique()
    # app.logger.debug(courses)
    
    # # Number of unique courses
    # n = len(courses)
    
    

    # Create a graph
    G = nx.Graph()
    
    # Add nodes (each timetable entry)
    for entry in data:
        G.add_node(entry['tableId'], **entry)

    # Add edges based on conflicts
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            session1 = data[i]
            session2 = data[j]

            # Check time conflict
            time_conflict = not (
                session1['endTime'] <= session2['startTime'] or session2['endTime'] <= session1['startTime']
            )

            # Instructor conflict
            instructor_conflict = session1['instructorId'] == session2['instructorId']

            # Student conflict (if any student is common)
            students1 = {s['userId'] for s in session1['students']}
            students2 = {s['userId'] for s in session2['students']}
            student_conflict = len(students1 & students2) > 0

            # Course conflict (if same course is scheduled at the same time)
            course_conflict = session1['courseId'] == session2['courseId']

            # If any of the constraints hold, add an edge
            if time_conflict and (instructor_conflict or student_conflict or course_conflict):
                G.add_edge(session1['tableId'], session2['tableId'])

            # Apply graph coloring to assign non-overlapping timeslots
    coloring = nx.coloring.greedy_color(G, strategy="largest_first")
    
    # Print the assigned timeslot groups
    for table_id, color in coloring.items():
        print(f"Table {table_id} -> Timeslot Group {color}")
        
    if data:
        return jsonify({"message": "Conflict detected"}), 200
    else:
        return jsonify({"error": "No data found"}), 404


def test_algo_library_schedule():
    
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    
    with open(json_file_path, "r") as file:
        data = json.load(file)

    for entry in data:
        # Convert Unix timestamp to datetime
        start_time = datetime.fromtimestamp(entry["startTime"])
        # Format time as HH:MM
        formatted_time = start_time.strftime("%H:%M")
        
        schedule.every().day.at(formatted_time).do(
            lambda e=entry: print(f"Session {e['tableId']} at {formatted_time}")
        )

    # Get all scheduled jobs
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

    # Constraint: No overlapping times for same instructor
    for i in sessions:
        for j in sessions:
            if i != j and sessions[i]["instructorId"] == sessions[j]["instructorId"]:
                model.Add(timeslot_vars[i] != timeslot_vars[j])

    # Solve
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    
    result = {}
    if status == cp_model.FEASIBLE:
        for tid in timeslot_vars:
            result[tid] = solver.Value(timeslot_vars[tid])
        return jsonify({
            "message": "Schedule found successfully",
            "status": "FEASIBLE",
            "schedule": result
        }), 200
    else:
        return jsonify({
            "message": "No feasible schedule found",
            "status": "INFEASIBLE"
        }), 404
