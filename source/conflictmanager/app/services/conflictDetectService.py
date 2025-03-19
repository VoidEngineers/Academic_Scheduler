from datetime import datetime
import json
import os
import boto3
from botocore.exceptions import ClientError
from flask import jsonify
import requests

import networkx as nx

from app import app
from dotenv import load_dotenv

load_dotenv()

def conflict_detect_service_with_mock_data():
    json_file_path = os.path.abspath(os.environ.get("MOCK_TABLES_PATH"))
    
    app.logger.debug(f"JSON file path: {json_file_path}")

    # Load the JSON data
    with open(json_file_path, "r", encoding="utf-8") as file:
        MockDataTables = json.load(file)

    # Now you can use MockDataTables as a Python dictionary
    # app.logger.debug(json.dumps(MockDataTables, indent=4))

    # data = jsonify(MockDataTables)
    
    # Load the dataset (replace with actual JSON input)
    data = MockDataTables  # Place your dataset here

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

