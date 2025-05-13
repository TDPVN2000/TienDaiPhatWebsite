from flask import Blueprint, request
from flask_restx import Resource
from ..utils.news_service import NewsService
from ..models import New
from ..extensions import db
from ..docs.api import news_ns, news_model
from . import BaseController

bp = Blueprint('news', __name__, url_prefix='api/news')

@news_ns.route('/')
class NewsList(BaseController):
    @news_ns.doc('list_news')
    @news_ns.marshal_list_with(news_model)
    def get(self):
        """List all news"""
        news = NewsService.get_all()
        return [n.to_dict() for n in news]

    @news_ns.doc('create_news')
    @news_ns.expect(news_model)
    @news_ns.marshal_with(news_model, code=201)
    def post(self):
        """Create a new news item"""
        data = request.get_json()
        new = NewsService.create(data)
        return new.to_dict(), 201

@news_ns.route('/<int:news_id>')
@news_ns.param('news_id', 'The news identifier')
class NewsResource(BaseController):
    @news_ns.doc('get_news')
    @news_ns.marshal_with(news_model)
    def get(self, news_id):
        """Get a news item by ID"""
        new = NewsService.get_by_id(news_id)
        if not new:
            news_ns.abort(404, 'News not found')
        return new.to_dict()

    @news_ns.doc('update_news')
    @news_ns.expect(news_model)
    @news_ns.marshal_with(news_model)
    def put(self, news_id):
        """Update a news item"""
        data = request.get_json()
        new = NewsService.update(news_id, data)
        if not new:
            news_ns.abort(404, 'News not found')
        return new.to_dict()

    @news_ns.doc('delete_news')
    @news_ns.response(204, 'News deleted')
    def delete(self, news_id):
        """Delete a news item"""
        success = NewsService.delete(news_id)
        if not success:
            news_ns.abort(404, 'News not found')
        return '', 204 
