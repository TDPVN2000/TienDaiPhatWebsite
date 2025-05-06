from flask_restx import Namespace, fields

project_ns = Namespace('project', description='Project operations')

project_model = project_ns.model('Project', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Project name'),
    'description': fields.String(description='Project description'),
    'image_url': fields.String(description='Project image URL'),
    'year_completed': fields.Integer(description='Year completed')
})

project_input_model = project_ns.model('ProjectInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Project name'),
    'description': fields.String(description='Project description'),
    'image_url': fields.String(description='Project image URL'),
    'year_completed': fields.Integer(description='Year completed')
})

project_list_model = project_ns.model('ProjectList', {
    'projects': fields.List(fields.Nested(project_model))
}) 
