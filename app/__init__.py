from flask import Flask, request, redirect 
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_login import LoginManager  
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
import os

from .config import Config   
from app.models import db, User 
from app.api.auth_routes import auth_routes
from app.api.score_routes import score_routes 
from app.api.drawing_route import drawing_route

app = Flask(__name__)

#connects application with Flask-Login for auth requirements (sessions, csrf) 
login_manager = LoginManager()
login_manager.init_app(app)
#every call to the backend, reload the user object on the response 
@login_manager.user_loader 
def load_user(id):
    return User.query.get(int(id))


#configure class Config with DB URI etc. 
app.config.from_object(Config)
#establish blueprints for each of the routes
app.register_blueprint(auth_routes) 
app.register_blueprint(score_routes)
app.register_blueprint(drawing_route)

db.init_app(app)
Migrate(app, db)

#enable cross domain AJAX calls 
CORS(app) 

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')