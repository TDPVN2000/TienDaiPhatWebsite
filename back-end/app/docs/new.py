from flask_restx import Namespace, Resource, fields
from app.models.new import New

news_ns = Namespace('news', description='News operations')

# Define models for request/response documentation
news_model = news_ns.model('News', {
    'id': fields.Integer(readonly=True, description='The news identifier'),
    'title': fields.String(required=True, description='News title'),
    'description': fields.String(description='News description'),
    'content': fields.String(required=True, description='News content'),
    'image_url': fields.String(description='News image URL'),
    'created_at': fields.DateTime(readonly=True, description='Creation timestamp'),
    'updated_at': fields.DateTime(readonly=True, description='Last update timestamp')
})

news_input_model = news_ns.model('NewsInput', {
    'title': fields.String(required=True, description='News title'),
    'description': fields.String(description='News description'),
    'content': fields.String(required=True, description='News content'),
    'image_url': fields.String(description='News image URL')
})

news_list_model = news_ns.model('NewsList', {
    'news': fields.List(fields.Nested(news_model), description='List of news')
})
