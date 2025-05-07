from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from flask_babel import Babel
from flask_mail import Mail
from flask_caching import Cache
from flask_migrate import Migrate
from .extensions import db
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    api = Api(
        app,
        version='1.0',
        title='Tien Dai Phat API',
        description='API for Tien Dai Phat website',
        doc='/api/docs'
    )
    babel = Babel(app)
    mail = Mail(app)
    cache = Cache(app)
    
    # Initialize database and migrations
    db.init_app(app)
    migrate = Migrate(app, db)
    
    with app.app_context():
        db.create_all()

    return app
