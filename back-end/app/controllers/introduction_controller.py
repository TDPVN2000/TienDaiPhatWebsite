from flask import Blueprint, request
from flask_restx import Resource
from ..utils.introduction_service import IntroductionService
from ..models import Introduction
from ..extensions import db
from ..docs.api import introduction_ns, introduction_model
from . import BaseController

bp = Blueprint('introduction', __name__, url_prefix='/api/introductions')

@introduction_ns.route('/')
class IntroductionList(BaseController):
    @introduction_ns.doc('list_introductions')
    @introduction_ns.marshal_list_with(introduction_model)
    def get(self):
        """List all introductions"""
        intros = IntroductionService.get_all()
        return [i.to_dict() for i in intros]

    @introduction_ns.doc('create_introduction')
    @introduction_ns.expect(introduction_model)
    @introduction_ns.marshal_with(introduction_model, code=201)
    def post(self):
        """Create a new introduction"""
        data = request.get_json()
        intro = IntroductionService.create(data)
        return intro.to_dict(), 201

@introduction_ns.route('/<int:intro_id>')
@introduction_ns.param('intro_id', 'The introduction identifier')
class IntroductionResource(BaseController):
    @introduction_ns.doc('get_introduction')
    @introduction_ns.marshal_with(introduction_model)
    def get(self, intro_id):
        """Get an introduction by ID"""
        intro = IntroductionService.get_by_id(intro_id)
        if not intro:
            introduction_ns.abort(404, 'Introduction not found')
        return intro.to_dict()

    @introduction_ns.doc('update_introduction')
    @introduction_ns.expect(introduction_model)
    @introduction_ns.marshal_with(introduction_model)
    def put(self, intro_id):
        """Update an introduction"""
        data = request.get_json()
        intro = IntroductionService.update(intro_id, data)
        if not intro:
            introduction_ns.abort(404, 'Introduction not found')
        return intro.to_dict()

    @introduction_ns.doc('delete_introduction')
    @introduction_ns.response(204, 'Introduction deleted')
    def delete(self, intro_id):
        """Delete an introduction"""
        success = IntroductionService.delete(intro_id)
        if not success:
            introduction_ns.abort(404, 'Introduction not found')
        return '', 204 
