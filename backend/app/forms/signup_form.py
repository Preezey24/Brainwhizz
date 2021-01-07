from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError  

from app.models import User  

def user_exists(form, field):
    print('Checking if user exists', field.data)
    email = field.data 
    user = User.query.filter(User.email == email).first()
    if user: 
        raise ValidationError('User already registered')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=4, max=12, message="Username must be between 4 and 12 characters long")])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(), EqualTo('confirm', message="Passwords must match")])
    confirm = StringField('confirm', validators=[DataRequired()])
