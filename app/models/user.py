from .db import db 
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin): 
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    math_high = db.Column(db.Integer)
    math_total = db.Column(db.Integer)
    memory_high = db.Column(db.Integer)
    memory_total = db.Column(db.Integer)
    total_score = db.Column(db.Integer)
    image_url = db.Column(db.String)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password): 
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password): 
        return check_password_hash(self.password, password)
    
    def to_dict(self): 
        return {
            "id": self.id, 
            "username": self.username, 
            "email": self.email, 
            "math_high": self.math_high,
            "math_total": self.math_total,
            "memory_high": self.memory_high,
            "memory_total": self.memory_total,
            "total_score": self.total_score,
            "image_url": self.image_url, 
        }
    
    def math_hiscore(self): 
        return {"success": self.math_high}

    def memory_hiscore(self): 
        return {'success': self.memory_high}
