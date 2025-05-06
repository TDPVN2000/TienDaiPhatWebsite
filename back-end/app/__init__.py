from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from flask_jwt_extended import JWTManager
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
    jwt = JWTManager(app)
    babel = Babel(app)
    mail = Mail(app)
    cache = Cache(app)
    
    # Initialize database and migrations
    db.init_app(app)
    migrate = Migrate(app, db)
    
    with app.app_context():
        db.create_all()

    # Register blueprints
    from .controllers import auth_controller, content_controller, category_controller, tag_controller, translation_controller
    app.register_blueprint(auth_controller.bp)
    app.register_blueprint(content_controller.bp)
    app.register_blueprint(category_controller.bp)
    app.register_blueprint(tag_controller.bp)
    app.register_blueprint(translation_controller.bp)

    # Add namespaces
    from .docs import (
        auth_ns, content_ns, category_ns, tag_ns, translation_ns,
        auth_model, content_model, category_model, tag_model, translation_model
    )
    api.add_namespace(auth_ns, path='/api/auth')
    api.add_namespace(content_ns, path='/api/content')
    api.add_namespace(category_ns, path='/api/category')
    api.add_namespace(tag_ns, path='/api/tag')
    api.add_namespace(translation_ns, path='/api/translation')

    return app
