from flask import Blueprint, request
from flask_restx import Resource
from ..utils.translation_service import TranslationService
from ..models import Translation
from ..extensions import db
from ..docs.api import translation_ns, translation_model, translation_input_model
from ..constants import MODEL_NAME_ENUM, LANGUAGE_CODE_ENUM
from . import BaseController

bp = Blueprint('translation', __name__, url_prefix='/api/translations')

@translation_ns.route('/')
class TranslationList(BaseController):
    @translation_ns.doc('list_translations')
    @translation_ns.marshal_list_with(translation_model)
    def get(self):
        """List all translations (optionally filter by language and model)"""
        language = request.args.get('language')
        model_name = request.args.get('model_name')

        query = Translation.query
        if language:
            query = query.filter_by(language=language)
        if model_name:
            query = query.filter_by(model_name=model_name)

        translations = query.all()
        return [t.to_dict() for t in translations]

    @translation_ns.doc('create_translation')
    @translation_ns.expect(translation_input_model)
    @translation_ns.marshal_with(translation_model, code=201)
    @translation_ns.response(400, 'Invalid input data')
    def post(self):
        """Create a new translation"""
        try:
            data = request.get_json()
            translation = TranslationService.create_translation(
                key=data['key'],
                language=data['language'],
                value=data['value'],
                model_name=data['model_name']
            )
            return translation.to_dict(), 201
        except ValueError as e:
            translation_ns.abort(400, str(e))

@translation_ns.route('/model-names')
class ModelNamesList(BaseController):
    @translation_ns.doc('get_model_names')
    def get(self):
        """Get all available model names for translations"""
        return {'model_names': MODEL_NAME_ENUM}

@translation_ns.route('/languages')
class LanguagesList(BaseController):
    @translation_ns.doc('get_languages')
    def get(self):
        """Get all available language codes for translations"""
        return {'languages': LANGUAGE_CODE_ENUM}

@translation_ns.route('/<int:translation_id>')
@translation_ns.param('translation_id', 'The translation identifier')
class TranslationResource(BaseController):
    @translation_ns.doc('get_translation')
    @translation_ns.marshal_with(translation_model)
    def get(self, translation_id):
        """Get a translation by ID"""
        translation = Translation.query.get(translation_id)
        if not translation:
            translation_ns.abort(404, 'Translation not found')
        return translation.to_dict()

    @translation_ns.doc('update_translation')
    @translation_ns.expect(translation_input_model)
    @translation_ns.marshal_with(translation_model)
    @translation_ns.response(400, 'Invalid input data')
    def put(self, translation_id):
        """Update a translation"""
        try:
            translation = Translation.query.get(translation_id)
            if not translation:
                translation_ns.abort(404, 'Translation not found')
            data = request.get_json()
            translation.value = data['value']
            translation.model_name = data['model_name']
            db.session.commit()
            return translation.to_dict()
        except ValueError as e:
            translation_ns.abort(400, str(e))

    @translation_ns.doc('delete_translation')
    @translation_ns.response(204, 'Translation deleted')
    def delete(self, translation_id):
        """Delete a translation"""
        translation = Translation.query.get(translation_id)
        if not translation:
            translation_ns.abort(404, 'Translation not found')
        db.session.delete(translation)
        db.session.commit()
        return '', 204
