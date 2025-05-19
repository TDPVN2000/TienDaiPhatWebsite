from flask import Blueprint, request
from flask_restx import Resource
from ..utils.recruitment_service import RecruitmentService
from ..models import Recruitment
from ..extensions import db
from ..docs.api import recruitment_ns, recruitment_model, recruitment_input_model
from . import BaseController

bp = Blueprint('recruitment', __name__, url_prefix='/api/recruitments')

@recruitment_ns.route('/')
class RecruitmentList(BaseController):
    @recruitment_ns.doc('list_recruitments')
    @recruitment_ns.marshal_list_with(recruitment_model)
    def get(self):
        """List all recruitment positions"""
        recruitments = RecruitmentService.get_all()
        return [r.to_dict() for r in recruitments]

    @recruitment_ns.doc('create_recruitment')
    @recruitment_ns.expect(recruitment_input_model)
    @recruitment_ns.marshal_with(recruitment_model, code=201)
    def post(self):
        """Create a new recruitment position"""
        data = request.get_json()
        recruitment = RecruitmentService.create(data)
        return recruitment.to_dict(), 201

@recruitment_ns.route('/<int:recruitment_id>')
@recruitment_ns.param('recruitment_id', 'The recruitment position identifier')
class RecruitmentResource(BaseController):
    @recruitment_ns.doc('get_recruitment')
    @recruitment_ns.marshal_with(recruitment_model)
    def get(self, recruitment_id):
        """Get a recruitment position by ID"""
        recruitment = RecruitmentService.get_by_id(recruitment_id)
        if not recruitment:
            recruitment_ns.abort(404, 'Recruitment position not found')
        return recruitment.to_dict()

    @recruitment_ns.doc('update_recruitment')
    @recruitment_ns.expect(recruitment_input_model)
    @recruitment_ns.marshal_with(recruitment_model)
    def put(self, recruitment_id):
        """Update a recruitment position"""
        data = request.get_json()
        recruitment = RecruitmentService.update(recruitment_id, data)
        if not recruitment:
            recruitment_ns.abort(404, 'Recruitment position not found')
        return recruitment.to_dict()

    @recruitment_ns.doc('delete_recruitment')
    @recruitment_ns.response(204, 'Recruitment position deleted')
    def delete(self, recruitment_id):
        """Delete a recruitment position"""
        success = RecruitmentService.delete(recruitment_id)
        if not success:
            recruitment_ns.abort(404, 'Recruitment position not found')
        return '', 204 
