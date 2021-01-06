from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager  

from .config import Config   
from app.models import db, User 
from api.auth_routes import auth_routes

app = Flask(__name__)

#connects application with Flask-Login for auth requirements 
login_manager = LoginManager()
login_manager.init_app(app)

#configure class Config with DB URI etc. 
app.config.from_object(Config)
#establish blueprints for each of the routes
app.register_blueprint(auth_routes) 

db.init_app(app)
Migrate(app, db)