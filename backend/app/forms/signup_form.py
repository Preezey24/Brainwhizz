from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired, EqualTo, Length 

from app.models import User  

def user_exists(form, field):
    print('Checking if user exists', field.data)
    email = field.data 
    user = User.query.filter(User.email == email).first()
    if user: 
        raise ValidationError('User already registered')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    confirm = StringField('confirm', validators=[DataRequired()])
