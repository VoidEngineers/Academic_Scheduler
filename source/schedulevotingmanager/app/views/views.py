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
from datetime import datetime, timedelta

from app.services.mongoDBconfig import (
    get_all_schedules_from_db,
    get_all_optimal_schedules_from_db,
    insert_optimal_schedule
)

# Initialize SocketIO with your Flask app
socketio = SocketIO(app, cors_allowed_origins="*")

redis_client = redis.Redis(host='deployments-redis-1', port=6379, db=0)

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
    all_schedules = get_all_optimal_schedules_from_db()
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
@app.get('/schedulevotingmanager/schedules')
def get_all_schedules():
    all_schedules = get_all_schedules_from_db()
    if not all_schedules:
        return jsonify({"message": "No schedules found"}), 404
    return jsonify(all_schedules), 200
    
@app.get('/schedulevotingmanager/all-schedules/redis')
def get_schedules_from_redis():
    try:
        schedules_data = redis_client.get('all_schedules')
        
        if schedules_data is None:
            return jsonify({"message": "No schedules found in Redis"}), 404
            
        schedules = json.loads(schedules_data)
        
        return jsonify(schedules), 200
        
    except Exception as e:
        app.logger.error(f"Failed to retrieve schedules from Redis: {str(e)}")
        return jsonify({"message": f"Failed to retrieve schedules from Redis: {str(e)}"}), 500
    
# Function to update Redis with latest schedule data
def update_redis_schedules():
    try:
        # Log start time for debugging
        app.logger.debug(f"Redis update started at {datetime.now()}")
        
        # Get schedules from database
        all_schedules = get_all_optimal_schedules_from_db()
        
        if all_schedules is None:
            app.logger.error("No schedules found in database")
            return
            
        # Parse database schedules to the right format
        if isinstance(all_schedules, str):
            db_schedules = json.loads(all_schedules)
        elif isinstance(all_schedules, list):
            db_schedules = all_schedules
        else:
            app.logger.error(f"Unexpected data type for schedules: {type(all_schedules)}")
            return
            
        # Get existing schedules from Redis (if any)
        try:
            redis_data = redis_client.get('all_schedules')
            if redis_data:
                redis_schedules = json.loads(redis_data)
            else:
                redis_schedules = []
        except Exception as e:
            app.logger.warning(f"Could not fetch existing Redis schedules: {str(e)}")
            redis_schedules = []
            
        # Create a map of existing Redis schedules by ID for easy lookup
        redis_schedules_map = {}
        for schedule in redis_schedules:
            if isinstance(schedule, dict) and '_id' in schedule:
                redis_schedules_map[schedule['_id']] = schedule
                
        # Create merged schedule list, preserving votes, comments, etc.
        updated_redis_schedules = []
        count = 0
        
        # Process each schedule from the database
        for db_schedule in db_schedules:
            if not isinstance(db_schedule, dict):
                continue
                
            count += 1
            schedule_id = db_schedule.get('_id')
            
            # If this schedule already exists in Redis, use that as base to preserve votes/comments
            if schedule_id and schedule_id in redis_schedules_map:
                # Start with the Redis version (which has user data)
                merged_schedule = redis_schedules_map[schedule_id].copy()
                
                # Update fields that might have changed in the database
                # but preserve voting and interaction data
                for key, value in db_schedule.items():
                    # Skip updating interaction data that should be preserved
                    if key not in ['likes', 'dislikes', 'votes', 'comments']:
                        merged_schedule[key] = value
            else:
                # This is a new schedule, use the db_schedule as base
                merged_schedule = db_schedule.copy()
                
                # Ensure it has ID (use original _id or count as fallback)
                if 'id' not in merged_schedule:
                    merged_schedule['id'] = count
                
                # Set title only if not already present
                if 'title' not in merged_schedule or not merged_schedule['title']:
                    merged_schedule['title'] = f"{merged_schedule.get('schedule_id', '')}"
                
                # Set description only if not already present
                if 'description' not in merged_schedule or not merged_schedule['description']:
                    merged_schedule['description'] = f"{merged_schedule.get('schedule_id', '')} academic schedule with {len(merged_schedule.get('sessions', []))} sessions"
                
                # Initialize votes counter if not present
                if 'votes' not in merged_schedule:
                    merged_schedule['votes'] = 0
                    
                # Initialize likes counter if not present
                if 'likes' not in merged_schedule:
                    merged_schedule['likes'] = 0
                
                # Initialize dislikes counter if not present
                if 'dislikes' not in merged_schedule:
                    merged_schedule['dislikes'] = 0
                
                # Initialize comments array if not present
                if 'comments' not in merged_schedule:
                    merged_schedule['comments'] = []
                elif not isinstance(merged_schedule['comments'], list):
                    # Fix if comments is the wrong type
                    merged_schedule['comments'] = []
                
                # Set image URL only if not already present
                if 'imageUrl' not in merged_schedule or not merged_schedule['imageUrl']:
                    merged_schedule['imageUrl'] = "https://via.placeholder.com/400"
            
            # Add the processed schedule to our updated list
            updated_redis_schedules.append(merged_schedule)
            
        if updated_redis_schedules:
            # Store the updated schedules in Redis
            redis_client.set('all_schedules', json.dumps(updated_redis_schedules))
            app.logger.debug(f"Updated {len(updated_redis_schedules)} schedules in Redis")
            app.logger.debug("Schedules successfully updated in Redis")
        else:
            app.logger.debug("No schedules found for Redis update")
        
        # Schedule the next run after this completes
        scheduler.add_job(
            func=update_redis_schedules,
            trigger="date",
            run_date=datetime.now() + timedelta(minutes=1),
            id="redis_update",
            replace_existing=True
        )
        app.logger.debug(f"Next Redis update scheduled for {datetime.now() + timedelta(minutes=1)}")
    except Exception as e:
        app.logger.error(f"Failed to update schedules in Redis: {str(e)}")
        # Even if it fails, schedule the next run
        scheduler.add_job(
            func=update_redis_schedules,
            trigger="date", 
            run_date=datetime.now() + timedelta(minutes=1),
            id="redis_update",
            replace_existing=True
        )

# Set up the scheduler
scheduler = BackgroundScheduler()

# Schedule the initial job
scheduler.add_job(
    func=update_redis_schedules,
    trigger="date",
    run_date=datetime.now() + timedelta(seconds=10),  # Start first job after 10 seconds
    id="redis_update"
)
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
    vote_type = data.get('vote_type')  # 'like' or 'dislike'
    schedule_id = data.get('schedule_id')
    action = data.get('action')  # 'add' or 'remove'
    
    # Process vote data here
    app.logger.debug(f"Received {vote_type} from {username} for schedule {schedule_id}: {action}")
    
    try:
        # Get current schedules from Redis
        schedules_data = redis_client.get('all_schedules')
        if schedules_data is None:
            app.logger.error("No schedules found in Redis")
            emit('error', {'message': 'No schedules found'})
            return
            
        schedules = json.loads(schedules_data)
        
        # Find the schedule to update
        schedule_updated = False
        updated_schedule = None
        for schedule in schedules:
            if not isinstance(schedule, dict) or schedule.get('_id') != schedule_id:
                continue
                
            # Update like/dislike count based on vote_type and action
            if vote_type == 'like':
                if action == 'add':
                    schedule['likes'] += 1
                elif action == 'remove':
                    schedule['likes'] = max(0, schedule['likes'] - 1)
            elif vote_type == 'dislike':
                if action == 'add':
                    schedule['dislikes'] += 1
                elif action == 'remove':
                    schedule['dislikes'] = max(0, schedule['dislikes'] - 1)
            
            # Make sure votes count is updated too
            schedule['votes'] = schedule['likes'] - schedule['dislikes']
            updated_schedule = schedule
            schedule_updated = True
            break
            
        if schedule_updated and updated_schedule:
            # Save updated schedules back to Redis with proper formatting
            redis_client.set('all_schedules', json.dumps(schedules))
            app.logger.debug(f"Updated schedule in Redis: {json.dumps(updated_schedule, indent=2)}")
            
            # Broadcast the vote update to everyone in the room
            emit('vote_update', {
                'username': username,
                'schedule_id': schedule_id,
                'vote_type': vote_type,
                'action': action,
                'likes': updated_schedule['likes'],
                'dislikes': updated_schedule['dislikes'],
                'votes': updated_schedule['votes'],
                'timestamp': datetime.now().isoformat()
            }, room=room)
        else:
            emit('error', {'message': f'Schedule with ID {schedule_id} not found'})
            
    except Exception as e:
        app.logger.error(f"Error processing vote: {str(e)}")
        emit('error', {'message': f'Error processing vote: {str(e)}'})

@socketio.on('comment')
def handle_comment(data):
    """Handle incoming comments"""
    username = data.get('username')
    room = data.get('room')
    schedule_id = data.get('schedule_id')
    comment_text = data.get('comment')
    
    app.logger.debug(f"Received comment from {username} for schedule {schedule_id}: {comment_text}")
    
    try:
        # Get current schedules from Redis
        schedules_data = redis_client.get('all_schedules')
        if schedules_data is None:
            app.logger.error("No schedules found in Redis")
            emit('error', {'message': 'No schedules found'})
            return
            
        schedules = json.loads(schedules_data)
        
        # Find the schedule to update
        schedule_updated = False
        updated_schedule = None
        for schedule in schedules:
            if not isinstance(schedule, dict) or schedule.get('_id') != schedule_id:
                continue
                
            # Format the comment with username and timestamp
            timestamp = datetime.now().isoformat()
            formatted_comment = f"{username} ({timestamp}): {comment_text}"
            
            # Add comment to the schedule
            if 'comments' not in schedule:
                schedule['comments'] = []
            schedule['comments'].append(formatted_comment)
            updated_schedule = schedule
            schedule_updated = True
            break
            
        if schedule_updated and updated_schedule:
            # Save updated schedules back to Redis with proper formatting
            redis_client.set('all_schedules', json.dumps(schedules))
            app.logger.debug(f"Updated comments in Redis for schedule {schedule_id}: {updated_schedule['comments']}")
            
            # Broadcast the comment update to everyone in the room
            emit('comment_update', {
                'username': username,
                'schedule_id': schedule_id,
                'comment': comment_text,
                'formatted_comment': formatted_comment,
                'timestamp': datetime.now().isoformat(),
                'comments': updated_schedule['comments']
            }, room=room)
        else:
            emit('error', {'message': f'Schedule with ID {schedule_id} not found'})
            
    except Exception as e:
        app.logger.error(f"Error processing comment: {str(e)}")
        emit('error', {'message': f'Error processing comment: {str(e)}'})

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
