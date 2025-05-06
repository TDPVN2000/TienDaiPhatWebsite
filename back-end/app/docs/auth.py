from flask_restx import fields
from .api import api

# Create namespace
auth_ns = api.namespace('auth', description='Authentication operations')

# Login request model
login_model = auth_ns.model('Login', {
    'email': fields.String(required=True, description='Email address'),
    'password': fields.String(required=True, description='Password')
})

# Token response model
token_model = auth_ns.model('Token', {
    'access_token': fields.String(description='JWT access token'),
    'refresh_token': fields.String(description='JWT refresh token')
})

# User model for responses
auth_model = auth_ns.model('User', {
    'id': fields.Integer(description='User ID'),
    'username': fields.String(description='Username'),
    'email': fields.String(description='Email address'),
    'first_name': fields.String(description='First name'),
    'last_name': fields.String(description='Last name'),
    'is_admin': fields.Boolean(description='Whether the user is an admin'),
    'is_active': fields.Boolean(description='Whether the user account is active'),
    'created_at': fields.DateTime(description='Account creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Success response wrapper
success_response = auth_ns.model('SuccessResponse', {
    'success': fields.Boolean(description='Whether the request was successful'),
    'data': fields.Raw(description='Response data'),
    'message': fields.String(description='Response message')
})

# Error response wrapper
error_response = auth_ns.model('ErrorResponse', {
    'success': fields.Boolean(description='Whether the request was successful'),
    'message': fields.String(description='Error message')
}) 
