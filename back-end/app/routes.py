from flask import Blueprint
from flask_restx import Api
from app.docs import api, content_ns, category_ns, tag_ns, translation_ns
from app.controllers.content_controller import ContentController
from app.controllers.category_controller import CategoryController
from app.controllers.tag_controller import TagController
from app.controllers.translation_controller import TranslationController

# Initialize the API
api_bp = Blueprint('api', __name__)
api.init_app(api_bp)

# Add namespaces to the API
api.add_namespace(content_ns)
api.add_namespace(category_ns)
api.add_namespace(tag_ns)
api.add_namespace(translation_ns)
