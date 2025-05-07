from flask import Blueprint, request
from flask_restx import Resource
from ..utils import field_service
from ..models import Field
from ..extensions import db
from ..docs.api import field_ns, field_model
from . import BaseController

bp = Blueprint('field', __name__, url_prefix='/api/fields')

@field_ns.route('/')
class FieldList(BaseController):
    @field_ns.doc('list_fields')
    @field_ns.marshal_list_with(field_model)
    def get(self):
        """List all fields"""
        fields = field_service.get_all()
        return [f.to_dict() for f in fields]

    @field_ns.doc('create_field')
    @field_ns.expect(field_model)
    @field_ns.marshal_with(field_model, code=201)
    def post(self):
        """Create a new field"""
        data = request.get_json()
        field = field_service.create(data)
        return field, 201

@field_ns.route('/<int:field_id>')
@field_ns.param('field_id', 'The field identifier')
class FieldResource(BaseController):
    @field_ns.doc('get_field')
    @field_ns.marshal_with(field_model)
    def get(self, field_id):
        """Get a field by ID with all related data"""
        include_children = request.args.get('include_children', 'false').lower() == 'true'
        field = field_service.get_by_id(field_id, include_children=include_children)
        if not field:
            field_ns.abort(404, 'Field not found')
        return field

    @field_ns.doc('update_field')
    @field_ns.expect(field_model)
    @field_ns.marshal_with(field_model)
    def put(self, field_id):
        """Update a field"""
        data = request.get_json()
        field = field_service.update(field_id, data)
        if not field:
            field_ns.abort(404, 'Field not found')
        return field

    @field_ns.doc('delete_field')
    @field_ns.response(204, 'Field deleted')
    def delete(self, field_id):
        """Delete a field"""
        success = field_service.delete(field_id)
        if not success:
            field_ns.abort(404, 'Field not found')
        return '', 204 
