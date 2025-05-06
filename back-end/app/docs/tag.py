from flask_restx import fields
from .api import api

# Create namespace
tag_ns = api.namespace('tags', description='Tag operations')

# Tag translation model
tag_translation_model = tag_ns.model('TagTranslation', {
    'id': fields.Integer(description='Translation ID'),
    'tag_id': fields.Integer(description='Tag ID'),
    'language': fields.String(description='Language code'),
    'name': fields.String(description='Translated name'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Tag model
tag_model = tag_ns.model('Tag', {
    'id': fields.Integer(description='Tag ID'),
    'name': fields.String(description='Tag name'),
    'slug': fields.String(description='Tag slug'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp'),
    'translations': fields.List(fields.Nested(tag_translation_model))
})

# Tag list response model
tag_list_model = tag_ns.model('TagList', {
    'items': fields.List(fields.Nested(tag_model)),
    'total': fields.Integer(description='Total number of items'),
    'pages': fields.Integer(description='Total number of pages'),
    'current_page': fields.Integer(description='Current page number'),
    'per_page': fields.Integer(description='Number of items per page')
})

# Tag query parameters
tag_query_params = tag_ns.parser()
tag_query_params.add_argument('page', type=int, default=1, help='Page number')
tag_query_params.add_argument('per_page', type=int, default=10, help='Items per page')
tag_query_params.add_argument('search', type=str, help='Search term')

# Tag creation/update model
tag_input_model = tag_ns.model('TagInput', {
    'name': fields.String(required=True, description='Tag name'),
    'slug': fields.String(description='Tag slug'),
    'language': fields.String(description='Language code', default='en')
}) 
