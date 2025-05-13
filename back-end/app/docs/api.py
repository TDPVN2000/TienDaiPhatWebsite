from flask_restx import Api, Namespace, Resource, fields
from .product import product_ns, product_model
from .new import news_ns, news_model

# Create API instance
api = Api(
    title='TienDaiPhat API',
    version='1.0',
    description='API documentation for TienDaiPhat website',
    doc='/api/docs',
    prefix='/api'
)

# Create namespaces for each controller
capability_ns = Namespace('capabilities', description='Capability operations')
table_data_ns = Namespace('table-data', description='Table data operations')
certification_ns = Namespace('certifications', description='Certification operations')
project_ns = Namespace('projects', description='Project operations')
investment_ns = Namespace('investments', description='Investment operations')
introduction_ns = Namespace('introductions', description='Introduction operations')
field_ns = Namespace('fields', description='Field operations')

# Common response models
error_model = api.model('Error', {
    'message': fields.String(description='Error message')
})

# Capability models
capability_model = api.model('Capability', {
    'id': fields.Integer(description='Capability ID'),
    'name': fields.String(description='Capability name'),
    'description': fields.String(description='Capability description'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Table Data models
table_data_model = api.model('TableData', {
    'id': fields.Integer(description='Table Data ID'),
    'name': fields.String(description='Table Data name'),
    'data': fields.Raw(description='Table Data content'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Certification models
certification_model = api.model('Certification', {
    'id': fields.Integer(description='Certification ID'),
    'name': fields.String(description='Certification name'),
    'description': fields.String(description='Certification description'),
    'image_url': fields.String(description='Certification image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Project models
project_model = api.model('Project', {
    'id': fields.Integer(description='Project ID'),
    'name': fields.String(description='Project name'),
    'description': fields.String(description='Project description'),
    'image_url': fields.String(description='Project image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Investment models
investment_model = api.model('Investment', {
    'id': fields.Integer(description='Investment ID'),
    'name': fields.String(description='Investment name'),
    'description': fields.String(description='Investment description'),
    'image_url': fields.String(description='Investment image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Introduction models
introduction_model = api.model('Introduction', {
    'id': fields.Integer(description='Introduction ID'),
    'title': fields.String(description='Introduction title'),
    'content': fields.String(description='Introduction content'),
    'image_url': fields.String(description='Introduction image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

# Field models
field_model = api.model('Field', {
    'id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Field name'),
    'description': fields.String(description='Field description'),
    'image_url': fields.String(description='Field image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp'),
    'investments': fields.List(fields.Nested(investment_model), description='Related investments'),
    'certifications': fields.List(fields.Nested(certification_model), description='Related certifications'),
    'projects': fields.List(fields.Nested(project_model), description='Related projects'),
    'table_data': fields.List(fields.Nested(table_data_model), description='Related table data'),
    'introductions': fields.List(fields.Nested(introduction_model), description='Related introductions'),
    'capabilities': fields.List(fields.Nested(capability_model), description='Related capabilities'),
    'products': fields.List(fields.Nested(product_model), description='Related products')
})

# Add namespaces to API
api.add_namespace(capability_ns)
api.add_namespace(table_data_ns)
api.add_namespace(certification_ns)
api.add_namespace(project_ns)
api.add_namespace(investment_ns)
api.add_namespace(product_ns)
api.add_namespace(introduction_ns)
api.add_namespace(field_ns)
api.add_namespace(news_ns)
