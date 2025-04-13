from flask import Flask, jsonify
import flask
from app import app
from concurrent.futures import ThreadPoolExecutor, as_completed
import re
import json

from app.services.testService import test_service 

from app.services.conflictDetectService import (
    conflict_detect_service_with_mock_data, 
    test_algo_library_schedule, 
    test_algo_library_ortools, 
    get_all_schedules_from_db, 
    create_graph, 
    generate_schedules, 
    gen_optimal_solution_for_schedules
)
from app.services.lecturersScheduling import test_nursescheduling_problem
from app.services.geminiServices import get_conflict_from_gemini
from app.services.mongoDBconfig import insert_optimal_schedule

@app.post('/conflictmanager')
def conflictmanager():
    
    schedules_response, status = get_all_schedules_from_db()
    if status != 200:
        return jsonify(schedules_response), status
    conflicts, gemini_status = get_conflict_from_gemini(schedules_response)
    graph = create_graph(conflicts)
    optimized_schedules = generate_schedules(graph, schedules_response.get("schedules"))
    result = gen_optimal_solution_for_schedules(optimized_schedules, schedules_response.get("schedules"))
    
    app.logger.debug(f"Optimized Schedules: {json.dumps(result, indent=4)}")
    
    if not result:
        return jsonify({"message": "No optimal solution found"}), 404
    else:
        # Insert the optimal schedules into the database
        insert_response = insert_optimal_schedule(result)
        if insert_response[1] != 201:
            return jsonify(insert_response[0]), insert_response[1], insert_response[2]
        else:
            return jsonify({"message": "Optimal schedules inserted successfully", "count": insert_response[0]["count"]}), 201
    
    
@app.get('/conflictmanager')
def get_conflictmanager():
    schedules_response, status = get_all_optimal_schedules_from_db()
    if status != 200:
        return jsonify(schedules_response), status
    else:
        return jsonify({"message": "Schedules fetched successfully", "schedules": schedules_response}), 200
    

@app.post('/conflictmanager/lecturerscheduling')
def conflictmanager_for_lec_scheduling():
    test_nursescheduling_problem()
    return jsonify({"message": "Lecturer scheduling problem solved successfully"}), 200


@app.route('/test')
def test():
    # test = test_service()
    test = "test"
    return test, 200

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200
