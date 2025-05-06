from flask_restx import fields
from .api import api

# Create namespace
translation_ns = api.namespace('translations', description='Translation operations')

# Translation model
translation_model = translation_ns.model('Translation', {
    'id': fields.Integer(description='Translation ID'),
    'content_id': fields.Integer(description='Content ID'),
    'language': fields.String(description='Language code'),
    'title': fields.String(description='Translated title'),
    'content': fields.String(description='Translated content'),
    'meta_description': fields.String(description='Translated meta description'),
    'meta_keywords': fields.String(description='Translated meta keywords'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Translation list response model
translation_list_model = translation_ns.model('TranslationList', {
    'items': fields.List(fields.Nested(translation_model)),
    'total': fields.Integer(description='Total number of items'),
    'pages': fields.Integer(description='Total number of pages'),
    'current_page': fields.Integer(description='Current page number'),
    'per_page': fields.Integer(description='Number of items per page')
})

# Translation query parameters
translation_query_params = translation_ns.parser()
translation_query_params.add_argument('page', type=int, default=1, help='Page number')
translation_query_params.add_argument('per_page', type=int, default=10, help='Items per page')
translation_query_params.add_argument('content_id', type=int, help='Filter by content ID')
translation_query_params.add_argument('language', type=str, help='Filter by language code')

# Translation creation/update model
translation_input_model = translation_ns.model('TranslationInput', {
    'content_id': fields.Integer(required=True, description='Content ID'),
    'language': fields.String(required=True, description='Language code'),
    'title': fields.String(required=True, description='Translated title'),
    'content': fields.String(required=True, description='Translated content'),
    'meta_description': fields.String(description='Translated meta description'),
    'meta_keywords': fields.String(description='Translated meta keywords')
}) 
