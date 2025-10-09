from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.controllers import (
    capability_controller, certification_controller, field_controller,
    introduction_controller, investment_controller, news_controller,
    product_controller, project_controller, recruitment_controller,
    table_data_controller, translation_controller, upload_controller
)

bp = Blueprint('main', __name__)

# Health check endpoint
@bp.route('/health')
@cross_origin()
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Service is running'}), 200
