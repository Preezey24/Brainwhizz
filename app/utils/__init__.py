from faker import Faker
from app.models import db, User 

fake = Faker() 

def generate_users():  
        math_total=fake.random_int(min=28, max=250)
        memory_total=fake.random_int(min=20, max=250)
        
        user = User(username=fake.user_name(), email=fake.email(), password=fake.password(),
        math_high=fake.random_int(min=1, max=28), math_total=math_total,
        memory_high=fake.random_digit_or_empty(), memory_total=memory_total, 
        total_score=math_total+memory_total, image_url=None)
        return user 


