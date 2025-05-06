from flask import current_app
from flask_restx import Resource
from app import db

class BaseController(Resource):
    """Base controller class with common functionality"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.db = db

    def success_response(self, data=None, message="Success", status_code=200):
        """Return a standardized success response"""
        return {
            'status': 'success',
            'message': message,
            'data': data
        }, status_code

    def error_response(self, message="Error", status_code=400):
        """Return a standardized error response"""
        return {
            'status': 'error',
            'message': message
        }, status_code

    def not_found_response(self, message="Resource not found"):
        return self.error_response(message, 404)

    def unauthorized_response(self, message="Unauthorized"):
        return self.error_response(message, 401)

    def forbidden_response(self, message="Forbidden"):
        return self.error_response(message, 403) 
