from flask import Blueprint, request
from flask_restx import Resource
from ..utils.capability_service import CapabilityService
from ..models import Capability
from ..extensions import db
from ..docs.api import capability_ns, capability_model
from . import BaseController

bp = Blueprint('capability', __name__, url_prefix='/api/capabilities')

@capability_ns.route('/')
class CapabilityList(BaseController):
    @capability_ns.doc('list_capabilities')
    @capability_ns.marshal_list_with(capability_model)
    def get(self):
        """List all capabilities"""
        caps = CapabilityService.get_all()
        return [c.to_dict() for c in caps]

    @capability_ns.doc('create_capability')
    @capability_ns.expect(capability_model)
    @capability_ns.marshal_with(capability_model, code=201)
    def post(self):
        """Create a new capability"""
        data = request.get_json()
        cap = CapabilityService.create(data)
        return cap.to_dict(), 201

@capability_ns.route('/<int:cap_id>')
@capability_ns.param('cap_id', 'The capability identifier')
class CapabilityResource(BaseController):
    @capability_ns.doc('get_capability')
    @capability_ns.marshal_with(capability_model)
    def get(self, cap_id):
        """Get a capability by ID"""
        cap = CapabilityService.get_by_id(cap_id)
        if not cap:
            capability_ns.abort(404, 'Capability not found')
        return cap.to_dict()

    @capability_ns.doc('update_capability')
    @capability_ns.expect(capability_model)
    @capability_ns.marshal_with(capability_model)
    def put(self, cap_id):
        """Update a capability"""
        data = request.get_json()
        cap = CapabilityService.update(cap_id, data)
        if not cap:
            capability_ns.abort(404, 'Capability not found')
        return cap.to_dict()

    @capability_ns.doc('delete_capability')
    @capability_ns.response(204, 'Capability deleted')
    def delete(self, cap_id):
        """Delete a capability"""
        success = CapabilityService.delete(cap_id)
        if not success:
            capability_ns.abort(404, 'Capability not found')
        return '', 204 
