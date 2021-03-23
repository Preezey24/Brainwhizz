from .db import db 

class Total(db.Model): 
    __tablename__ = 'totals'

    id = db.Column(db.Integer, primary_key=True)
    total_math_score = db.Column(db.Integer, nullable=False)
    avg_math_score = db.Column(db.Float, nullable=False)
    total_memory_score = db.Column(db.Integer, nullable=False)
    avg_memory_score = db.Column(db.Float, nullable=False)
