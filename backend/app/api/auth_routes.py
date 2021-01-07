from flask import Blueprint, session, redirect, request  
from flask_login import current_user, login_user, logout_user, login_required 

from app.models import User, db  
from app.forms import SignUpForm

auth_routes = Blueprint('auth', __name__, url_prefix='/auth')

@auth_routes.route('/')
def authenticate(): 
    if current_user.is_authenticated: 
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/signup', methods=['POST'])
def signup(): 
    form = SignUpForm()
    print(form.data, request.cookies['csrf_token'])
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): 
        print('HELLO')
        user = User(
            username=form.data['username'],
            email=form.data['email'], 
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors 
    

# @auth_routes.route('/login', methods=['POST'])
# def login():
#     form = LoginForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User.query.filter(User.username == form.data['username']).first()
#         login_user(user)
#         return user.to_dict()
#     return form.errors

# @auth_routes.route('/logout')
# @login_required
# def logout(): 
#     logout_user()
#     return redirect('/')



