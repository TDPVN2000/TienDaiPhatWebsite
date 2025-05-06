from flask import Blueprint, request
from flask_restx import Resource
from ..utils.capability_service import CapabilityService
from ..models import Capability
from ..extensions import db
from . import BaseController

bp = Blueprint('capability', __name__)

class CapabilityController(BaseController):
    def get(self, cap_id=None):
        if cap_id:
            cap = CapabilityService.get_by_id(cap_id)
            if not cap:
                return self.not_found_response('Capability not found')
            return self.success_response(cap.to_dict())
        caps = CapabilityService.get_all()
        return self.success_response([c.to_dict() for c in caps])

    def post(self):
        data = request.get_json()
        cap = CapabilityService.create(data)
        return self.success_response(cap.to_dict(), 'Capability created', 201)

    def put(self, cap_id):
        data = request.get_json()
        cap = CapabilityService.update(cap_id, data)
        if not cap:
            return self.not_found_response('Capability not found')
        return self.success_response(cap.to_dict(), 'Capability updated')

    def delete(self, cap_id):
        success = CapabilityService.delete(cap_id)
        if not success:
            return self.not_found_response('Capability not found')
        return self.success_response(None, 'Capability deleted') 
