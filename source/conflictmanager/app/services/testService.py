from datetime import datetime
import json
import os
import boto3
from botocore.exceptions import ClientError
from flask import jsonify
import requests

from app import app
from dotenv import load_dotenv

load_dotenv()

def test_service():
    return jsonify({"message": "Test"})

