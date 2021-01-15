from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import User 

def check_user(form, field): 
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user: 
        raise ValidationError('User is not recognized')

def check_password(form, field): 
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user.check_password(password):
        raise ValidationError('Password is incorrect')

class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), check_user])
    password = StringField('password', validators=[DataRequired(), check_password])