from flask import Flask
from flask_cors import CORS
from flask_babel import Babel
from flask_mail import Mail
from flask_caching import Cache
from flask_migrate import Migrate
from .extensions import db
from .config import Config
from .docs.api import api
from .controllers import (
    capability_controller,
    table_data_controller,
    certification_controller,
    project_controller,
    investment_controller,
    product_controller,
    introduction_controller,
    field_controller
)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    babel = Babel(app)
    mail = Mail(app)
    cache = Cache(app)
    
    # Initialize database and migrations
    db.init_app(app)
    migrate = Migrate(app, db)
    
    with app.app_context():
        db.create_all()

    # Initialize API
    api.init_app(app)

    # Register blueprints
    app.register_blueprint(capability_controller.bp)
    app.register_blueprint(table_data_controller.bp)
    app.register_blueprint(certification_controller.bp)
    app.register_blueprint(project_controller.bp)
    app.register_blueprint(investment_controller.bp)
    app.register_blueprint(product_controller.bp)
    app.register_blueprint(introduction_controller.bp)
    app.register_blueprint(field_controller.bp)

    return app
