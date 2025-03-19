from flask import Flask, jsonify
import flask
from app import app
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

from app.services.testService import test_service 
from app.services.conflictDetectService import conflict_detect_service_with_mock_data

@app.post('/conflictmanager')
def conflictmanager():
    test, status_code = conflict_detect_service_with_mock_data()
    if status_code == 200:
        return test, 200
    elif status_code == 404:
        return test, 404
    else:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/test')
def test():
    # test = test_service()
    test = "test"
    return test, 200

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200
