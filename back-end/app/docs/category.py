from flask_restx import fields
from .api import api

# Create namespace
category_ns = api.namespace('categories', description='Category operations')

# Category translation model
category_translation_model = category_ns.model('CategoryTranslation', {
    'id': fields.Integer(description='Translation ID'),
    'category_id': fields.Integer(description='Category ID'),
    'language': fields.String(description='Language code'),
    'name': fields.String(description='Translated name'),
    'description': fields.String(description='Translated description'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Category model
category_model = category_ns.model('Category', {
    'id': fields.Integer(description='Category ID'),
    'name': fields.String(description='Category name'),
    'slug': fields.String(description='Category slug'),
    'description': fields.String(description='Category description'),
    'parent_id': fields.Integer(description='Parent category ID'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp'),
    'translations': fields.List(fields.Nested(category_translation_model))
})

# Category list response model
category_list_model = category_ns.model('CategoryList', {
    'items': fields.List(fields.Nested(category_model)),
    'total': fields.Integer(description='Total number of items'),
    'pages': fields.Integer(description='Total number of pages'),
    'current_page': fields.Integer(description='Current page number'),
    'per_page': fields.Integer(description='Number of items per page')
})

# Category query parameters
category_query_params = category_ns.parser()
category_query_params.add_argument('page', type=int, default=1, help='Page number')
category_query_params.add_argument('per_page', type=int, default=10, help='Items per page')
category_query_params.add_argument('search', type=str, help='Search term')
category_query_params.add_argument('parent_id', type=int, help='Filter by parent category ID')

# Category creation/update model
category_input_model = category_ns.model('CategoryInput', {
    'name': fields.String(required=True, description='Category name'),
    'slug': fields.String(description='Category slug'),
    'description': fields.String(description='Category description'),
    'parent_id': fields.Integer(description='Parent category ID'),
    'language': fields.String(description='Language code', default='en')
}) 
