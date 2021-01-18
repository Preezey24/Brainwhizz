from flask import Blueprint, session, redirect, request  
from flask_login import current_user, login_user, logout_user, login_required 

from app.models import User, db  
from app.forms import SignUpForm
from app.forms import LoginForm 

auth_routes = Blueprint('auth', __name__, url_prefix='/auth')

def validation_errors_to_error_messages(validation_errors): 
    errorMessages = []
    for field in validation_errors: 
        for error in validation_errors[field]: 
            errorMessages.append(f"{field} : {error}")
    return errorMessages

# @auth_routes.route('/')
# def authenticate(): 
#     if current_user.is_authenticated: 
#         return current_user.to_dict()
#     return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/signup', methods=['POST'])
def signup(): 
    if request.method == 'GET':
        return 'Welcome to BrainWhizz!'
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): 
        user = User(
            username=form.data['username'],
            email=form.data['email'], 
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

@auth_routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return 'Welcome to BrainWhizz!'
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    print(validation_errors_to_error_messages(form.errors)) 
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401 

@auth_routes.route('/logout')
@login_required
def logout(): 
    logout_user()
    return redirect("/")



