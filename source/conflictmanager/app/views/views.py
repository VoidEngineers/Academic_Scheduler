from flask import Flask, jsonify
import flask
from app import app
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

from app.services.testService import test_service # type: ignore

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Conflict Manager API"}), 200

@app.route('/test')
def test():
    # test = test_service()
    test = "test"
    return test, 200

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200
