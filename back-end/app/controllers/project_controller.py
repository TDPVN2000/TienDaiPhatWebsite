from flask import Blueprint, request
from flask_restx import Resource
from ..utils.project_service import ProjectService
from ..models import Project
from ..extensions import db
from . import BaseController

bp = Blueprint('project', __name__)

class ProjectController(BaseController):
    def get(self, project_id=None):
        if project_id:
            project = ProjectService.get_by_id(project_id)
            if not project:
                return self.not_found_response('Project not found')
            return self.success_response(project.to_dict())
        projects = ProjectService.get_all()
        return self.success_response([p.to_dict() for p in projects])

    def post(self):
        data = request.get_json()
        project = ProjectService.create(data)
        return self.success_response(project.to_dict(), 'Project created', 201)

    def put(self, project_id):
        data = request.get_json()
        project = ProjectService.update(project_id, data)
        if not project:
            return self.not_found_response('Project not found')
        return self.success_response(project.to_dict(), 'Project updated')

    def delete(self, project_id):
        success = ProjectService.delete(project_id)
        if not success:
            return self.not_found_response('Project not found')
        return self.success_response(None, 'Project deleted') 
