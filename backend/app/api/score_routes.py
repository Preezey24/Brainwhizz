from flask import Blueprint, request, session 
from app.models import User, db 
from sqlalchemy import case 

score_routes = Blueprint('score', __name__, url_prefix='/score')

@score_routes.route('/math', methods=['PUT'])
def math(): 
    email = request.get_json().get('email')
    score = request.get_json().get('score')
    user = User.query.filter(User.email == email).first()
    if not user.total_score: 
        user.math_total = score 
        user.math_high = score
        user.total_score = score 
        db.session.commit()
    elif not user.math_total: 
        user.math_total = score
        user.math_high = score
        db.session.commit()
    elif score > user.math_high: 
        user.math_high = score 
        user.math_total = score + user.math_total
        db.session.commit()     
    else: 
        user.math_total = score + user.math_total 
        db.session.commit() 
    return user.to_dict() 

@score_routes.route('/memory', methods=['PUT'])
def math(): 
    email = request.get_json().get('email')
    score = request.get_json().get('score')
    user = User.query.filter(User.email == email).first()
    if not user.total_score: 
        user.memory_total = score 
        user.memory_high = score
        user.total_score = score 
        db.session.commit()
    elif not user.memory_total: 
        user.memory_total = score
        user.memory_high = score
        db.session.commit()
    elif score > user.memory_high: 
        user.memory_high = score 
        user.memory_total = score + user.memory_total
        db.session.commit()     
    else: 
        user.memory_total = score + user.memory_total 
        db.session.commit() 
    return user.to_dict() 
