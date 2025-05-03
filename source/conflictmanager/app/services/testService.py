from datetime import datetime
from flask import jsonify

from app import app
from dotenv import load_dotenv

load_dotenv()

def test_service():
    return jsonify({"message": "Test"})

