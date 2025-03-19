from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

if os.environ.get('FLASK_ENV') == 'development':
    app.config.from_object('app.config.DevelopmentConfig')
elif os.environ.get('FLASK_ENV') == 'testing':
    app.config.from_object('app.config.TestingConfig')
else:
    app.config.from_object('app.config.ProductionConfig')

# from app.services import views     # importing collector views
from app.views import views     # importing collector views
