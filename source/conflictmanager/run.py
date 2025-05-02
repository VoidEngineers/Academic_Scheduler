import os
from app import app
import configparser

config = configparser.ConfigParser()
config.read(os.environ.get("MONGO_DB_URI"))

if __name__ == "__main__":
    app.config["MONGO_URI"] = os.environ.get("MONGO_DB_URI")
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
