from flask_restx import fields
from .api import api

# Create namespace
content_ns = api.namespace('contents', description='Content operations')

# Content translation model
content_translation_model = content_ns.model('ContentTranslation', {
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

# Content model
content_model = content_ns.model('Content', {
    'id': fields.Integer(description='Content ID'),
    'title': fields.String(description='Content title'),
    'content': fields.String(description='Content body'),
    'status': fields.String(description='Content status (draft/published)'),
    'content_type': fields.String(description='Type of content'),
    'featured_image': fields.String(description='URL of featured image'),
    'meta_description': fields.String(description='Meta description for SEO'),
    'meta_keywords': fields.String(description='Meta keywords for SEO'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp'),
    'translations': fields.List(fields.Nested(content_translation_model))
})

# Content list response model
content_list_model = content_ns.model('ContentList', {
    'items': fields.List(fields.Nested(content_model)),
    'total': fields.Integer(description='Total number of items'),
    'pages': fields.Integer(description='Total number of pages'),
    'current_page': fields.Integer(description='Current page number'),
    'per_page': fields.Integer(description='Number of items per page')
})

# Content query parameters
content_query_params = content_ns.parser()
content_query_params.add_argument('page', type=int, default=1, help='Page number')
content_query_params.add_argument('per_page', type=int, default=10, help='Items per page')
content_query_params.add_argument('status', type=str, help='Filter by status')
content_query_params.add_argument('content_type', type=str, help='Filter by content type')
content_query_params.add_argument('sort_by', type=str, default='created_at', help='Sort field')
content_query_params.add_argument('sort_order', type=str, default='desc', help='Sort order (asc/desc)')
content_query_params.add_argument('search', type=str, help='Search term')

# Content creation/update model
content_input_model = content_ns.model('ContentInput', {
    'title': fields.String(required=True, description='Content title'),
    'content': fields.String(required=True, description='Content body'),
    'status': fields.String(description='Content status (draft/published)', default='draft'),
    'content_type': fields.String(required=True, description='Type of content'),
    'featured_image': fields.String(description='URL of featured image'),
    'meta_description': fields.String(description='Meta description for SEO'),
    'meta_keywords': fields.String(description='Meta keywords for SEO'),
    'language': fields.String(description='Language code', default='en')
}) 
