from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 

from .config import Config   
from .models import db 

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)