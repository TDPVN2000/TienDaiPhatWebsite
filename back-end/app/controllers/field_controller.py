from flask import Blueprint, request
from flask_restx import Resource
from ..utils.field_service import FieldService
from ..models import Field
from ..extensions import db
from . import BaseController

bp = Blueprint('field', __name__)

class FieldController(BaseController):
    def get(self, field_id=None):
        if field_id:
            field = FieldService.get_by_id(field_id)
            if not field:
                return self.not_found_response('Field not found')
            return self.success_response(field.to_dict())
        fields = FieldService.get_all()
        return self.success_response([f.to_dict() for f in fields])

    def post(self):
        data = request.get_json()
        field = FieldService.create(data)
        return self.success_response(field.to_dict(), 'Field created', 201)

    def put(self, field_id):
        data = request.get_json()
        field = FieldService.update(field_id, data)
        if not field:
            return self.not_found_response('Field not found')
        return self.success_response(field.to_dict(), 'Field updated')

    def delete(self, field_id):
        success = FieldService.delete(field_id)
        if not success:
            return self.not_found_response('Field not found')
        return self.success_response(None, 'Field deleted') 
