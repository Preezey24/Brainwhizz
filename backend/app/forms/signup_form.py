from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired, Email, EqualTo, Length  

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=5, max=50, message='Must be between 5 and 50 \
                            characters in length')])
    email = StringField('email', validators=[DataRequired(), Email(), Length(max=255, message="We do not accept emails of such \
                        magnitude")])
    password = StringField('password', validators=[DataRequired(), EqualTo('confirm', message='Passwords must match'), Length(min=6, \
                            message="Password must be at least 6 characters long")])
    confirm = StringField('confirm', validators=[DataRequired()])
