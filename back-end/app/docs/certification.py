from flask_restx import Namespace, fields

certification_ns = Namespace('certification', description='Certification operations')

certification_model = certification_ns.model('Certification', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Certification name'),
    'image_url': fields.String(description='Certification image URL'),
    'description': fields.String(description='Certification description')
})

certification_input_model = certification_ns.model('CertificationInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Certification name'),
    'image_url': fields.String(description='Certification image URL'),
    'description': fields.String(description='Certification description')
})

certification_list_model = certification_ns.model('CertificationList', {
    'certifications': fields.List(fields.Nested(certification_model))
}) 
