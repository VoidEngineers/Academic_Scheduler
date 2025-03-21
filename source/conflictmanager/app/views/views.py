from flask import Flask, jsonify
import flask
from app import app
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

from app.services.testService import test_service 
from app.services.conflictDetectService import conflict_detect_service_with_mock_data, test_algo_library_schedule, test_algo_library_ortools
from app.services.lecturersScheduling import test_nursescheduling_problem

@app.post('/conflictmanager')
def conflictmanager():
    test, status_code = test_algo_library_ortools()
    # test_libcolgraph , status_code_libcolgraph  = conflict_detect_service_with_real_data_in_libcolgraph()
    if status_code == 200:
        return test, 200
    elif status_code == 404:
        return test, 404
    else:
        return jsonify({"error": "Internal server error"}), 500

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
