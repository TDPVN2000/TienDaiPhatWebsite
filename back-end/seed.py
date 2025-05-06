from werkzeug.security import generate_password_hash
from app import create_app, db
from app.models import User

def seed_admin_user():
    """Create admin user if not exists"""
    app = create_app()
    with app.app_context():
        # Check if admin user already exists
        admin = User.query.filter_by(email='admin@tiendaiphat.com').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@tiendaiphat.com',
                password_hash=generate_password_hash('admin123'),
                is_active=True,
                is_admin=True,
                first_name='Admin',
                last_name='User'
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created successfully")
        else:
            print("Admin user already exists")

if __name__ == '__main__':
    seed_admin_user() 
