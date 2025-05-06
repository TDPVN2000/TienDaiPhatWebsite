from flask import Blueprint, request
from flask_restx import Resource, reqparse
from flask_jwt_extended import jwt_required
from ..models import Tag, TagTranslation
from ..docs import tag_ns, tag_model, tag_translation_model, tag_list_model, tag_query_params, tag_input_model
from ..extensions import db
from . import BaseController

# Create blueprint
bp = Blueprint('tag', __name__)

@tag_ns.route('')
class TagList(Resource):
    @tag_ns.expect(tag_query_params)
    @tag_ns.marshal_with(tag_list_model)
    def get(self):
        """List all tags"""
        pass

    @tag_ns.expect(tag_input_model)
    @tag_ns.marshal_with(tag_model)
    def post(self):
        """Create a new tag"""
        pass

@tag_ns.route('/<int:id>')
class Tag(Resource):
    @tag_ns.marshal_with(tag_model)
    def get(self, id):
        """Get a tag by ID"""
        pass

    @tag_ns.expect(tag_input_model)
    @tag_ns.marshal_with(tag_model)
    def put(self, id):
        """Update a tag"""
        pass

    def delete(self, id):
        """Delete a tag"""
        pass

@tag_ns.route('')
@tag_ns.route('/<int:tag_id>')
class TagController(BaseController):
    """Controller for managing tag resources"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('language', type=str, default='en')

    @tag_ns.doc('get_tag')
    @tag_ns.marshal_with(tag_model)
    def get(self, tag_id=None):
        """Get a single tag or list all tags"""
        if tag_id:
            tag = Tag.query.get_or_404(tag_id)
            return self.success_response(tag.to_dict())
        
        tags = Tag.query.all()
        return self.success_response([tag.to_dict() for tag in tags])

    @tag_ns.doc('create_tag')
    @tag_ns.expect(tag_model)
    @tag_ns.marshal_with(tag_model, code=201)
    @jwt_required()
    def post(self):
        """Create a new tag"""
        args = self.parser.parse_args()
        
        tag = Tag(name=args['name'])
        translation = TagTranslation(
            tag=tag,
            language=args['language'],
            name=args['name']
        )
        
        self.db.session.add(tag)
        self.db.session.add(translation)
        self.db.session.commit()
        
        return self.success_response(tag.to_dict(), "Tag created successfully", 201)

    @tag_ns.doc('update_tag')
    @tag_ns.expect(tag_model)
    @tag_ns.marshal_with(tag_model)
    @jwt_required()
    def put(self, tag_id):
        """Update an existing tag"""
        tag = Tag.query.get_or_404(tag_id)
        args = self.parser.parse_args()
        
        tag.name = args['name']
        
        # Update or create translation
        translation = TagTranslation.query.filter_by(
            tag_id=tag_id,
            language=args['language']
        ).first()
        
        if translation:
            translation.name = args['name']
        else:
            translation = TagTranslation(
                tag=tag,
                language=args['language'],
                name=args['name']
            )
            self.db.session.add(translation)
        
        self.db.session.commit()
        return self.success_response(tag.to_dict(), "Tag updated successfully")

    @tag_ns.doc('delete_tag')
    @tag_ns.response(204, 'Tag deleted')
    @jwt_required()
    def delete(self, tag_id):
        """Delete a tag"""
        tag = Tag.query.get_or_404(tag_id)
        self.db.session.delete(tag)
        self.db.session.commit()
        return self.success_response(None, "Tag deleted successfully") 
