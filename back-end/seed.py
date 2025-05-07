from app import create_app
from app.extensions import db

def seed_data():
    """Seed initial data"""
    pass

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_data() 
