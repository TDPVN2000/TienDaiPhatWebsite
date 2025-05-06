from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_babel import Babel
from flask_cors import CORS
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from redis import Redis

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
babel = Babel()
mail = Mail()
cache = Cache()
redis_client = Redis()

def init_app(app):
    """Initialize Flask extensions with the app"""
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    babel.init_app(app)
    CORS(app)
    mail.init_app(app)
    cache.init_app(app)
    
    # Initialize Redis client
    redis_client.from_url(app.config['REDIS_URL'])
    
    # Initialize rate limiter
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"],
        storage_uri=app.config['REDIS_URL']
    )
