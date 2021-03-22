from app.utils import generate_users
from app.models import db 

def seed_users(): 
    for i in range(250): 
        user = generate_users() 
        db.session.add(user)
        db.session.commit() 

def undo_users(): 
    db.session('TRUNCATE users;')
    db.session.commit()
