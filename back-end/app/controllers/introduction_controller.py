from flask import Blueprint, request
from flask_restx import Resource
from ..utils.introduction_service import IntroductionService
from ..models import Introduction
from ..extensions import db
from . import BaseController

bp = Blueprint('introduction', __name__)

class IntroductionController(BaseController):
    def get(self, intro_id=None):
        if intro_id:
            intro = IntroductionService.get_by_id(intro_id)
            if not intro:
                return self.not_found_response('Introduction not found')
            return self.success_response(intro.to_dict())
        intros = IntroductionService.get_all()
        return self.success_response([i.to_dict() for i in intros])

    def post(self):
        data = request.get_json()
        intro = IntroductionService.create(data)
        return self.success_response(intro.to_dict(), 'Introduction created', 201)

    def put(self, intro_id):
        data = request.get_json()
        intro = IntroductionService.update(intro_id, data)
        if not intro:
            return self.not_found_response('Introduction not found')
        return self.success_response(intro.to_dict(), 'Introduction updated')

    def delete(self, intro_id):
        success = IntroductionService.delete(intro_id)
        if not success:
            return self.not_found_response('Introduction not found')
        return self.success_response(None, 'Introduction deleted') 
