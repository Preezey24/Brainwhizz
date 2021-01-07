from flask import Flask, request 
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager  
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
import os

from .config import Config   
from app.models import db, User 
from app.api.auth_routes import auth_routes

app = Flask(__name__)

#connects application with Flask-Login for auth requirements (sessions, csrf) 
login_manager = LoginManager()
login_manager.init_app(app)

#configure class Config with DB URI etc. 
app.config.from_object(Config)
#establish blueprints for each of the routes
app.register_blueprint(auth_routes) 

db.init_app(app)
Migrate(app, db)

#enable cross domain AJAX calls 
CORS(app) 

@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(), 
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False, 
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None, 
                        httponly=True)
    return response  

# @app.route('/', defaults={'path': ''})