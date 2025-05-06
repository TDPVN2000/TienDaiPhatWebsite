from flask import Blueprint, request
from flask_restx import Resource, reqparse
from flask_jwt_extended import jwt_required
from ..models.translation import Translation
from ..docs import translation_ns, translation_model, translation_list_model, translation_query_params, translation_input_model
from ..extensions import db
from . import BaseController

# Create blueprint
bp = Blueprint('translation', __name__)

@translation_ns.route('')
class TranslationList(Resource):
    @translation_ns.expect(translation_query_params)
    @translation_ns.marshal_with(translation_list_model)
    def get(self):
        """List all translations"""
        pass

    @translation_ns.expect(translation_input_model)
    @translation_ns.marshal_with(translation_model)
    def post(self):
        """Create a new translation"""
        pass

@translation_ns.route('/<int:id>')
class Translation(Resource):
    @translation_ns.marshal_with(translation_model)
    def get(self, id):
        """Get a translation by ID"""
        pass

    @translation_ns.expect(translation_input_model)
    @translation_ns.marshal_with(translation_model)
    def put(self, id):
        """Update a translation"""
        pass

    def delete(self, id):
        """Delete a translation"""
        pass

@translation_ns.route('')
@translation_ns.route('/<int:translation_id>')
class TranslationController(BaseController):
    """Controller for managing translations"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('key', type=str, required=True)
        self.parser.add_argument('language', type=str, required=True)
        self.parser.add_argument('value', type=str, required=True)

    @translation_ns.doc('get_translation')
    @translation_ns.marshal_with(translation_model)
    def get(self, translation_id=None):
        """Get a single translation or list all translations"""
        if translation_id:
            translation = Translation.query.get_or_404(translation_id)
            return self.success_response(translation.to_dict())
        
        translations = Translation.query.all()
        return self.success_response([t.to_dict() for t in translations])

    @translation_ns.doc('create_translation')
    @translation_ns.expect(translation_model)
    @translation_ns.marshal_with(translation_model, code=201)
    @jwt_required()
    def post(self):
        """Create a new translation"""
        args = self.parser.parse_args()
        
        # Check if translation already exists
        existing = Translation.query.filter_by(
            key=args['key'],
            language=args['language']
        ).first()
        
        if existing:
            return self.error_response("Translation already exists", 409)
        
        translation = Translation(
            key=args['key'],
            language=args['language'],
            value=args['value']
        )
        
        self.db.session.add(translation)
        self.db.session.commit()
        
        return self.success_response(translation.to_dict(), "Translation created successfully", 201)

    @translation_ns.doc('update_translation')
    @translation_ns.expect(translation_model)
    @translation_ns.marshal_with(translation_model)
    @jwt_required()
    def put(self, translation_id):
        """Update an existing translation"""
        translation = Translation.query.get_or_404(translation_id)
        args = self.parser.parse_args()
        
        translation.key = args['key']
        translation.language = args['language']
        translation.value = args['value']
        
        self.db.session.commit()
        return self.success_response(translation.to_dict(), "Translation updated successfully")

    @translation_ns.doc('delete_translation')
    @translation_ns.response(204, 'Translation deleted')
    @jwt_required()
    def delete(self, translation_id):
        """Delete a translation"""
        translation = Translation.query.get_or_404(translation_id)
        self.db.session.delete(translation)
        self.db.session.commit()
        return self.success_response(None, "Translation deleted successfully") 
