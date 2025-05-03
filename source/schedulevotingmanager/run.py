import os
from app import app
import configparser
from app.views.views import socketio

config = configparser.ConfigParser()
config.read(os.environ.get("MONGO_DB_URI"))

app.config['SECRET_KEY'] = 'schedulevotingmanager'

if __name__ == "__main__":
    app.config["MONGO_URI"] = os.environ.get("MONGO_DB_URI")
    # app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
