from flask_restx import Namespace, Resource, fields
from app.models.new import New

api = Namespace('news', description='News operations')

# Define models for request/response documentation
new_model = api.model('New', {
    'id': fields.Integer(readonly=True, description='The news identifier'),
    'title': fields.String(required=True, description='News title'),
    'description': fields.String(description='News description'),
    'content': fields.String(required=True, description='News content'),
    'image_url': fields.String(description='News image URL'),
    'created_at': fields.DateTime(readonly=True, description='Creation timestamp'),
    'updated_at': fields.DateTime(readonly=True, description='Last update timestamp')
})

new_input_model = api.model('NewInput', {
    'title': fields.String(required=True, description='News title'),
    'description': fields.String(description='News description'),
    'content': fields.String(required=True, description='News content'),
    'image_url': fields.String(description='News image URL')
})

new_list_model = api.model('NewList', {
    'news': fields.List(fields.Nested(new_model), description='List of news')
})

@api.route('/')
class NewList(Resource):
    @api.doc('list_news')
    @api.marshal_list_with(new_model)
    def get(self):
        """List all news"""
        return New.query.order_by(New.created_at.desc()).all()

    @api.doc('create_news')
    @api.expect(new_input_model)
    @api.marshal_with(new_model, code=201)
    def post(self):
        """Create a new news item"""
        data = api.payload
        new = New(
            title=data['title'],
            description=data.get('description'),
            content=data['content'],
            image_url=data.get('image_url')
        )
        new.save()
        return new, 201

@api.route('/<int:id>')
@api.param('id', 'The news identifier')
@api.response(404, 'News not found')
class NewResource(Resource):
    @api.doc('get_news')
    @api.marshal_with(new_model)
    def get(self, id):
        """Get a news item by ID"""
        return New.query.get_or_404(id)

    @api.doc('update_news')
    @api.expect(new_input_model)
    @api.marshal_with(new_model)
    def put(self, id):
        """Update a news item"""
        new = New.query.get_or_404(id)
        data = api.payload
        
        if 'title' in data:
            new.title = data['title']
        if 'description' in data:
            new.description = data['description']
        if 'content' in data:
            new.content = data['content']
        if 'image_url' in data:
            new.image_url = data['image_url']
            
        new.save()
        return new

    @api.doc('delete_news')
    @api.response(204, 'News deleted')
    def delete(self, id):
        """Delete a news item"""
        new = New.query.get_or_404(id)
        new.delete()
        return '', 204 
