import bson
from app import app 
import os

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId

def get_db():
    # Get MongoDB URI from environment variables
    mongo_uri = os.environ.get('MONGO_DB_URI')
    
    if not mongo_uri:
        app.logger.error("MONGO_DB_URI environment variable is not set")
        raise ValueError("MONGO_DB_URI environment variable is not set")

    # Initialize MongoDB client
    try:
        client = MongoClient(mongo_uri, server_api=ServerApi('1'))
        # Test the connection
        # client.admin.command('ping')
        # app.logger.info("Successfully connected to MongoDB!")
        db = client.get_default_database("timesyncdb-dev")
        
        # # Test database access
        # db.command('ping')
        # app.logger.info(f"Successfully connected to database: {db_name}")
        
        return db
    except Exception as e:
        app.logger.error(f"Error connecting to MongoDB: {str(e)}")
        return str(e)

db = LocalProxy(get_db)

def get_all_schedules_from_db():
    try:
        schedules = db.schedules.find()
        app.logger.info(f"Schedules : {schedules}")
        # Convert cursor to list and handle ObjectId serialization
        schedule_list = []
        for schedule in schedules:
            # Convert ObjectId to string for JSON serialization
            schedule['_id'] = str(schedule['_id'])
            schedule_list.append(schedule)
        app.logger.debug(f"Found {len(schedule_list)} schedules")
        return schedule_list
    except OperationFailure as e:
        app.logger.error(f"Error fetching schedules: {e}")
        return []
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return []


def get_all_optimal_schedules_from_db():
    try:
        schedules = db.optimalSolution.find()
        app.logger.info(f"Schedules : {schedules}")
        # Convert cursor to list and handle ObjectId serialization
        schedule_list = []
        for schedule in schedules:
            # Convert ObjectId to string for JSON serialization
            schedule['_id'] = str(schedule['_id'])
            schedule_list.append(schedule)
        app.logger.debug(f"Found {len(schedule_list)} schedules")
        return schedule_list
    except OperationFailure as e:
        app.logger.error(f"Error fetching schedules: {e}")
        return []
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        return []

def insert_optimal_schedule(schedule_list):
    try:
        # Check if the "optimalSolution" collection exists and drop it if it does
        if "optimalSolution" in db.list_collection_names():
            app.logger.info("Dropping existing 'optimalSolution' collection")
            db.optimalSolution.drop()

        # Insert each schedule as a separate document in the "optimalSolution" collection
        for schedule in schedule_list:
            schedule['_id'] = ObjectId()  # Assign a unique ObjectId to each schedule
            db.optimalSolution.insert_one(schedule)
            app.logger.info(f"Inserted schedule into 'optimalSolution' with ID: {schedule['_id']}")

        return {
            "message": "Schedules inserted successfully into 'optimalSolution'",
            "count": len(schedule_list)
        }, 201
    except DuplicateKeyError as e:
        app.logger.error(f"Duplicate key error: {e}")
        return {
            "error": "Schedule with this ID already exists."
        }, 400
    except Exception as e:
        app.logger.error(f"Error inserting schedules: {e}")
        return {
            "error": f"Error inserting schedules: {str(e)}"
        }, 400


