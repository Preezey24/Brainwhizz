from flask import Blueprint, session 
from flask_login import current_user, login_user, logout_user, login_required 

from app.models import User, db  
from app.forms import SignUpForm

auth_routes=Blueprint('auth', __name__)


@auth_routes.route('/sign_up', methods=('POST'))
def sign_up(): 
    form = SignUpForm()
    if form.validate_on_submit(): 
        user = User(
            username=form.data['username'],
            email=form.data['email'], 
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
