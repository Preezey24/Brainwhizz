from flask import Blueprint, request
from app.models import User, db
from flask_login import login_required, current_user 

home_route = Blueprint('home', __name__, url_prefix='/home')

@home_route.route('', methods=['GET','POST'])
@login_required
def home(): 
    return {"hello": "hello"}