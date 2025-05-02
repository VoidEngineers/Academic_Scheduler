from flask import Flask, jsonify, send_file
import flask
import os
from app import app
from concurrent.futures import ThreadPoolExecutor, as_completed
import re
import json
import redis
from flask_socketio import SocketIO, emit, join_room, leave_room
from apscheduler.schedulers.background import BackgroundScheduler
from concurrent.futures import ThreadPoolExecutor, as_completed

from app.services.mongoDBconfig import (
    get_all_schedules_from_db
)

# Initialize SocketIO with your Flask app
socketio = SocketIO(app, cors_allowed_origins="*")

redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Add a root route
@app.route('/')
def index():
    return jsonify({"message": "Academic Scheduler Voting app API is running"}), 200

@app.post('/schedulevotingmanager')
def schedule_voting_manager():
    data = flask.request.get_json()
    return jsonify(data), 200

@app.get('/schedulevotingmanager')
def get_schedule_voting_manager():
    all_schedules = get_all_schedules_from_db()
    if not all_schedules:
        return jsonify({"message": "No schedules found"}), 404
        
    # Store schedules in Redis
    try:
        redis_client.set('all_schedules', json.dumps(all_schedules))
        app.logger.debug("Schedules successfully stored in Redis")
        return jsonify({"message": "Schedules stored in Redis"}), 200
    except Exception as e:
        app.logger.error(f"Failed to store schedules in Redis: {str(e)}")
        app.logger.debug(f"Failed to store schedules in Redis: {str(e)}")
        return jsonify({"message": "Failed to store schedules in Redis"}), 500

# Add a new endpoint to get schedules from Redis
@app.get('/schedulevotingmanager/all-schedules/redis')
def get_schedules_from_redis():
    try:
        schedules_data = redis_client.get('all_schedules')
        if schedules_data:
            return json.loads(schedules_data), 200
        else:
            return jsonify({"message": "No schedules found in Redis"}), 404
    except Exception as e:
        app.logger.error(f"Failed to retrieve schedules from Redis: {str(e)}")
        return jsonify({"message": "Failed to retrieve schedules from Redis"}), 500
    
# Function to update Redis with latest schedule data
def update_redis_schedules():
    try:
        all_schedules = get_all_schedules_from_db()
        if all_schedules:
            redis_client.set('all_schedules', json.dumps(all_schedules, indent=4))
            app.logger.debug("Schedules successfully updated in Redis (scheduled update)")
        else:
            app.logger.debug("No schedules found for Redis update")
    except Exception as e:
        app.logger.error(f"Failed to update schedules in Redis: {str(e)}")

# Set up the scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=update_redis_schedules, trigger="interval", minutes=1)
scheduler.start()


@app.route('/test')
def test():
    # test = test_service()
    test = "test"
    return test, 200

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

# WebSocket event handlers
@socketio.on('connect')
def handle_connect():
    app.logger.debug('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    app.logger.debug('Client disconnected')

@socketio.on('join')
def on_join(data):
    """Join a specific room for voting on a schedule"""
    username = data.get('username')
    room = data.get('room')
    if username and room:
        join_room(room)
        emit('status', {'message': f'{username} has joined the room {room}'}, room=room)

@socketio.on('leave')
def on_leave(data):
    """Leave a specific room"""
    username = data.get('username')
    room = data.get('room')
    if username and room:
        leave_room(room)
        emit('status', {'message': f'{username} has left the room {room}'}, room=room)

@socketio.on('vote')
def handle_vote(data):
    """Handle incoming votes"""
    username = data.get('username')
    room = data.get('room')
    vote = data.get('vote')
    
    # Process vote data here
    app.logger.debug(f"Received vote from {username} in room {room}: {vote}")
    
    # Broadcast the vote to everyone in the room
    emit('vote_update', {
        'username': username,
        'vote': vote,
        'timestamp': flask.request.timestamp
    }, room=room)
    
# Add this route to serve a test HTML client
@app.route('/voting-app-socket-client')
def socket_client():
    # Create directory for static files if it doesn't exist
    static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static')
    os.makedirs(static_dir, exist_ok=True)
    
    # Create the HTML file if it doesn't exist
    client_file = os.path.join(static_dir, 'socket_client.html')
    if not os.path.exists(client_file):
        with open(client_file, 'w') as f:
            f.write("""<!DOCTYPE html>
<html>
<head>
    <title>Schedule Voting Client</title>
    <script src="https://cdn.socket.io/4.6.0/socket.io.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const socket = io();
            
            socket.on('connect', () => {
                console.log('Connected to server');
                document.getElementById('status').textContent = 'Connected';
            });
            
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
                document.getElementById('status').textContent = 'Disconnected';
            });
            
            socket.on('status', (data) => {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML += `<p>${data.message}</p>`;
            });
            
            socket.on('vote_update', (data) => {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML += `<p><strong>${data.username}</strong>: voted ${data.vote}</p>`;
            });
            
            document.getElementById('joinBtn').addEventListener('click', () => {
                const username = document.getElementById('username').value;
                const room = document.getElementById('room').value;
                socket.emit('join', { username, room });
            });
            
            document.getElementById('voteForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const room = document.getElementById('room').value;
                const vote = document.querySelector('input[name="vote"]:checked').value;
                
                socket.emit('vote', { username, room, vote });
            });
        });
    </script>
</head>
<body>
    <h1>Schedule Voting Client</h1>
    <p>Status: <span id="status">Disconnected</span></p>
    
    <div>
        <input type="text" id="username" placeholder="Username">
        <input type="text" id="room" placeholder="Room ID">
        <button id="joinBtn">Join Room</button>
    </div>
    
    <form id="voteForm">
        <h3>Cast your vote:</h3>
        <input type="radio" id="approve" name="vote" value="approve">
        <label for="approve">Approve</label><br>
        <input type="radio" id="reject" name="vote" value="reject">
        <label for="reject">Reject</label><br>
        <button type="submit">Submit Vote</button>
    </form>
    
    <div id="messages"></div>
</body>
</html>""")
    
    return send_file(client_file)
    