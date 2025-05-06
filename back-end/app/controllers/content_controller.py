from flask import Blueprint, request, abort
from flask_restx import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Content, ContentTranslation, User
from ..docs import content_ns, content_model, content_translation_model, content_list_model, content_query_params, content_input_model
from ..extensions import db
from sqlalchemy import desc
from functools import wraps
from . import BaseController

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()
        if not current_user_id:
            abort(401, description="Authentication required")
        
        user = User.query.get(current_user_id)
        if not user or not user.is_admin:
            abort(403, description="Admin privileges required")
        
        return f(*args, **kwargs)
    return decorated_function

# Create blueprint
bp = Blueprint('content', __name__)

@content_ns.route('')
class ContentList(Resource):
    @content_ns.expect(content_query_params)
    @content_ns.marshal_with(content_list_model)
    def get(self):
        """List all contents"""
        pass

    @content_ns.expect(content_input_model)
    @content_ns.marshal_with(content_model)
    def post(self):
        """Create a new content"""
        pass

@content_ns.route('/<int:id>')
class Content(Resource):
    @content_ns.marshal_with(content_model)
    def get(self, id):
        """Get a content by ID"""
        pass

    @content_ns.expect(content_input_model)
    @content_ns.marshal_with(content_model)
    def put(self, id):
        """Update a content"""
        pass

    def delete(self, id):
        """Delete a content"""
        pass

@content_ns.route('')
@content_ns.route('/<int:content_id>')
class ContentController(BaseController):
    """Controller for managing content resources"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('title', type=str, required=True)
        self.parser.add_argument('content', type=str, required=True)
        self.parser.add_argument('status', type=str, default='draft')
        self.parser.add_argument('content_type', type=str, required=True)
        self.parser.add_argument('featured_image', type=str)
        self.parser.add_argument('meta_description', type=str)
        self.parser.add_argument('meta_keywords', type=str)
        self.parser.add_argument('language', type=str, default='en')

        # List endpoint parser
        self.list_parser = reqparse.RequestParser()
        self.list_parser.add_argument('page', type=int, default=1)
        self.list_parser.add_argument('per_page', type=int, default=10)
        self.list_parser.add_argument('status', type=str)
        self.list_parser.add_argument('content_type', type=str)
        self.list_parser.add_argument('sort_by', type=str, default='created_at')
        self.list_parser.add_argument('sort_order', type=str, default='desc')
        self.list_parser.add_argument('search', type=str)

    @content_ns.doc('get_content')
    @content_ns.marshal_with(content_model)
    def get(self, content_id=None):
        """Get a single content item or list all content items"""
        if content_id:
            content = Content.query.get_or_404(content_id)
            # Only return published content for non-admin users
            current_user_id = get_jwt_identity()
            if not current_user_id:
                if content.status != 'published':
                    abort(404, description="Content not found")
            else:
                user = User.query.get(current_user_id)
                if not user or not user.is_admin:
                    if content.status != 'published':
                        abort(404, description="Content not found")
            return self.success_response(content.to_dict())
        
        # Parse query parameters
        args = self.list_parser.parse_args()
        page = args['page']
        per_page = args['per_page']
        status = args['status']
        content_type = args['content_type']
        sort_by = args['sort_by']
        sort_order = args['sort_order']
        search = args['search']

        # Build query
        query = Content.query

        # Apply filters
        if status:
            query = query.filter(Content.status == status)
        if content_type:
            query = query.filter(Content.content_type == content_type)
        if search:
            query = query.filter(
                (Content.title.ilike(f'%{search}%')) |
                (Content.content.ilike(f'%{search}%'))
            )

        # For non-admin users, only show published content
        current_user_id = get_jwt_identity()
        if not current_user_id:
            query = query.filter(Content.status == 'published')
        else:
            user = User.query.get(current_user_id)
            if not user or not user.is_admin:
                query = query.filter(Content.status == 'published')

        # Apply sorting
        if sort_order == 'desc':
            query = query.order_by(desc(getattr(Content, sort_by)))
        else:
            query = query.order_by(getattr(Content, sort_by))

        # Paginate results
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return self.success_response({
            'items': [content.to_dict() for content in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'current_page': page,
            'per_page': per_page
        })

    @content_ns.doc('create_content')
    @content_ns.expect(content_model)
    @content_ns.marshal_with(content_model, code=201)
    @jwt_required()
    @admin_required
    def post(self):
        """Create a new content item (Admin only)"""
        args = self.parser.parse_args()
        
        content = Content(
            title=args['title'],
            content=args['content'],
            status=args['status'],
            content_type=args['content_type'],
            featured_image=args['featured_image'],
            meta_description=args['meta_description'],
            meta_keywords=args['meta_keywords']
        )
        
        translation = ContentTranslation(
            content_item=content,
            language=args['language'],
            title=args['title'],
            content=args['content'],
            meta_description=args['meta_description'],
            meta_keywords=args['meta_keywords']
        )
        
        self.db.session.add(content)
        self.db.session.add(translation)
        self.db.session.commit()
        
        return self.success_response(content.to_dict(), "Content created successfully", 201)

    @content_ns.doc('update_content')
    @content_ns.expect(content_model)
    @content_ns.marshal_with(content_model)
    @jwt_required()
    @admin_required
    def put(self, content_id):
        """Update an existing content item (Admin only)"""
        content = Content.query.get_or_404(content_id)
        args = self.parser.parse_args()
        
        content.title = args['title']
        content.content = args['content']
        content.status = args['status']
        content.content_type = args['content_type']
        content.featured_image = args['featured_image']
        content.meta_description = args['meta_description']
        content.meta_keywords = args['meta_keywords']
        
        # Update or create translation
        translation = ContentTranslation.query.filter_by(
            content_id=content_id,
            language=args['language']
        ).first()
        
        if translation:
            translation.title = args['title']
            translation.content = args['content']
            translation.meta_description = args['meta_description']
            translation.meta_keywords = args['meta_keywords']
        else:
            translation = ContentTranslation(
                content_item=content,
                language=args['language'],
                title=args['title'],
                content=args['content'],
                meta_description=args['meta_description'],
                meta_keywords=args['meta_keywords']
            )
            self.db.session.add(translation)
        
        self.db.session.commit()
        return self.success_response(content.to_dict(), "Content updated successfully")

    @content_ns.doc('delete_content')
    @content_ns.response(204, 'Content deleted')
    @jwt_required()
    @admin_required
    def delete(self, content_id):
        """Delete a content item (Admin only)"""
        content = Content.query.get_or_404(content_id)
        self.db.session.delete(content)
        self.db.session.commit()
        return self.success_response(None, "Content deleted successfully") 
 