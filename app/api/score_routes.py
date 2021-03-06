from flask import Blueprint, request, session 
from app.models import User, Total, db 
from flask_login import login_required 

score_routes = Blueprint('score', __name__, url_prefix='/score')

@score_routes.route('/math/high', methods=['PUT'])
@login_required
def math_high(): 
    email = request.get_json().get('email')
    score = request.get_json().get('gameScore')
    user = User.query.filter(User.email == email).first()
    if not user.math_high:  
        user.math_high = score 
        db.session.commit()
        return user.math_hiscore()
    elif score > user.math_high: 
        user.math_high = score 
        db.session.commit()      
        return user.math_hiscore()
    return ('', 204)

@score_routes.route('/math', methods=['PUT'])
@login_required
def math(): 
    email = request.get_json().get('email')
    score = request.get_json().get('score')
    user = User.query.filter(User.email == email).first()
    #update the total score for the application 
    total = Total.query.get(1)
    total.total_math += score 
    if not user.total_score: 
        user.math_total = score 
        user.total_score = score 
        db.session.commit()
    elif not user.math_total: 
        user.math_total = score
        user.total_score = score + user.total_score
        db.session.commit()    
    else: 
        user.math_total = score + user.math_total 
        user.total_score = score + user.total_score
        db.session.commit() 
    return user.to_dict()

@score_routes.route('/memory/high', methods=['PUT'])
@login_required
def memory_high():
    email = request.get_json().get('email')
    score = request.get_json().get('gameScore')
    user = User.query.filter(User.email == email).first()
    if not user.memory_high:  
        user.memory_high = score 
        db.session.commit()
        return user.memory_hiscore()
    elif score > user.memory_high: 
        user.memory_high = score 
        db.session.commit()      
        return user.memory_hiscore()
    return ('', 204)
    
@score_routes.route('/memory', methods=['PUT'])
@login_required 
def memory(): 
    email = request.get_json().get('email')
    score = request.get_json().get('score')
    user = User.query.filter(User.email == email).first()
    if not user.total_score: 
        user.memory_total = score 
        user.total_score = score 
        db.session.commit()
    elif not user.memory_total: 
        user.memory_total = score
        user.total_score = score + user.total_score
        db.session.commit()    
    else: 
        user.memory_total = score + user.memory_total 
        user.total_score = score + user.total_score
        db.session.commit() 
    return user.to_dict()
   

