from flask import Blueprint, request
from flask_restx import Resource
from ..utils.project_service import ProjectService
from ..models import Project
from ..extensions import db
from ..docs.api import project_ns, project_model
from . import BaseController

bp = Blueprint('project', __name__, url_prefix='/api/projects')

@project_ns.route('/')
class ProjectList(BaseController):
    @project_ns.doc('list_projects')
    @project_ns.marshal_list_with(project_model)
    def get(self):
        """List all projects"""
        projects = ProjectService.get_all()
        return [p.to_dict() for p in projects]

    @project_ns.doc('create_project')
    @project_ns.expect(project_model)
    @project_ns.marshal_with(project_model, code=201)
    def post(self):
        """Create a new project"""
        data = request.get_json()
        project = ProjectService.create(data)
        return project.to_dict(), 201

@project_ns.route('/<int:project_id>')
@project_ns.param('project_id', 'The project identifier')
class ProjectResource(BaseController):
    @project_ns.doc('get_project')
    @project_ns.marshal_with(project_model)
    def get(self, project_id):
        """Get a project by ID"""
        project = ProjectService.get_by_id(project_id)
        if not project:
            project_ns.abort(404, 'Project not found')
        return project.to_dict()

    @project_ns.doc('update_project')
    @project_ns.expect(project_model)
    @project_ns.marshal_with(project_model)
    def put(self, project_id):
        """Update a project"""
        data = request.get_json()
        project = ProjectService.update(project_id, data)
        if not project:
            project_ns.abort(404, 'Project not found')
        return project.to_dict()

    @project_ns.doc('delete_project')
    @project_ns.response(204, 'Project deleted')
    def delete(self, project_id):
        """Delete a project"""
        success = ProjectService.delete(project_id)
        if not success:
            project_ns.abort(404, 'Project not found')
        return '', 204 
