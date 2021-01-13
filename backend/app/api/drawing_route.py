from flask import Blueprint, request, session 
from app.models import User, db 
from flask_login import login_required 

drawing_route = Blueprint('drawing', __name__)

@drawing_route.route('/drawing', methods=['PUT'])
@login_required
def drawing(): 
    email = request.get_json().get('email')
    image_url = request.get_json().get('imageURL')
    user = User.query.filter(User.email == email).first()
    user.image_url = image_url
    db.session.commit()
    return user.to_dict()
