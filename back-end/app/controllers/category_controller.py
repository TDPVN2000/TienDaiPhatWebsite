from flask import Blueprint, request
from flask_restx import Resource, reqparse
from flask_jwt_extended import jwt_required
from ..models import Category, CategoryTranslation
from ..docs import category_ns, category_model, category_translation_model, category_list_model, category_query_params, category_input_model
from ..extensions import db
from . import BaseController

# Create blueprint
bp = Blueprint('category', __name__)

@category_ns.route('')
class CategoryList(Resource):
    @category_ns.expect(category_query_params)
    @category_ns.marshal_with(category_list_model)
    def get(self):
        """List all categories"""
        pass

    @category_ns.expect(category_input_model)
    @category_ns.marshal_with(category_model)
    def post(self):
        """Create a new category"""
        pass

@category_ns.route('/<int:id>')
class Category(Resource):
    @category_ns.marshal_with(category_model)
    def get(self, id):
        """Get a category by ID"""
        pass

    @category_ns.expect(category_input_model)
    @category_ns.marshal_with(category_model)
    def put(self, id):
        """Update a category"""
        pass

    def delete(self, id):
        """Delete a category"""
        pass

@category_ns.route('')
@category_ns.route('/<int:category_id>')
class CategoryController(BaseController):
    """Controller for managing category resources"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('description', type=str)
        self.parser.add_argument('language', type=str, default='en')

    @category_ns.doc('get_category')
    @category_ns.marshal_with(category_model)
    def get(self, category_id=None):
        """Get a single category or list all categories"""
        if category_id:
            category = Category.query.get_or_404(category_id)
            return self.success_response(category.to_dict())
        
        categories = Category.query.all()
        return self.success_response([category.to_dict() for category in categories])

    @category_ns.doc('create_category')
    @category_ns.expect(category_model)
    @category_ns.marshal_with(category_model, code=201)
    @jwt_required()
    def post(self):
        """Create a new category"""
        args = self.parser.parse_args()
        
        category = Category(name=args['name'])
        translation = CategoryTranslation(
            category=category,
            language=args['language'],
            name=args['name'],
            description=args.get('description')
        )
        
        self.db.session.add(category)
        self.db.session.add(translation)
        self.db.session.commit()
        
        return self.success_response(category.to_dict(), "Category created successfully", 201)

    @category_ns.doc('update_category')
    @category_ns.expect(category_model)
    @category_ns.marshal_with(category_model)
    @jwt_required()
    def put(self, category_id):
        """Update an existing category"""
        category = Category.query.get_or_404(category_id)
        args = self.parser.parse_args()
        
        category.name = args['name']
        
        # Update or create translation
        translation = CategoryTranslation.query.filter_by(
            category_id=category_id,
            language=args['language']
        ).first()
        
        if translation:
            translation.name = args['name']
            translation.description = args.get('description')
        else:
            translation = CategoryTranslation(
                category=category,
                language=args['language'],
                name=args['name'],
                description=args.get('description')
            )
            self.db.session.add(translation)
        
        self.db.session.commit()
        return self.success_response(category.to_dict(), "Category updated successfully")

    @category_ns.doc('delete_category')
    @category_ns.response(204, 'Category deleted')
    @jwt_required()
    def delete(self, category_id):
        """Delete a category"""
        category = Category.query.get_or_404(category_id)
        self.db.session.delete(category)
        self.db.session.commit()
        return self.success_response(None, "Category deleted successfully") 
 