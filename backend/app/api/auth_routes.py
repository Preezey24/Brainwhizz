from flask import Blueprint, session 
from flask_login import current_user, login_user, logout_user, login_required 

from app.models import User, db  
from app.forms import SignUpForm

auth_routes=Blueprint('auth', __name__)

