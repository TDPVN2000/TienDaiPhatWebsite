from flask import Blueprint, request, jsonify
from flask_restx import reqparse, Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_babel import gettext as _
from app.models import User
from app.docs import auth_ns, auth_model, login_model, token_model, success_response, error_response
from . import BaseController
from ..extensions import db

# Create blueprint
bp = Blueprint('auth', __name__)

@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.expect(auth_model)
    @auth_ns.response(201, 'User created successfully', success_response)
    @auth_ns.response(400, 'Validation error', error_response)
    def post(self):
        """Register a new user"""
        data = request.get_json()
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return {'message': _('Email already registered')}, 400
            
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return {'message': _('User registered successfully')}, 201

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    @auth_ns.response(200, 'Login successful', token_model)
    @auth_ns.response(401, 'Invalid credentials', error_response)
    def post(self):
        """Login user and return tokens"""
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.verify_password(data['password']):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return {
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200
            
        return {'message': _('Invalid email or password')}, 401

@auth_ns.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    @auth_ns.response(200, 'Token refreshed', token_model)
    @auth_ns.response(401, 'Invalid refresh token', error_response)
    def post(self):
        """Refresh access token"""
        current_user_id = get_jwt_identity()
        access_token = create_access_token(identity=current_user_id)
        return {'access_token': access_token}, 200

@auth_ns.route('/me')
class UserProfile(Resource):
    @jwt_required()
    @auth_ns.response(200, 'User profile retrieved', auth_model)
    @auth_ns.response(401, 'Invalid token', error_response)
    def get(self):
        """Get current user profile"""
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        return user.to_dict(), 200

@auth_ns.route('/change-password')
class ChangePassword(Resource):
    @jwt_required()
    @auth_ns.expect(login_model)
    @auth_ns.response(200, 'Password changed successfully', success_response)
    @auth_ns.response(401, 'Invalid credentials', error_response)
    def post(self):
        """Change user password"""
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        data = request.get_json()
        
        if user.check_password(data['password']):
            user.set_password(data['new_password'])
            db.session.commit()
            return {'message': _('Password changed successfully')}, 200
            
        return {'message': _('Invalid current password')}, 401 
