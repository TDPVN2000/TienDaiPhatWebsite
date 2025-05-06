from flask_restx import Namespace, fields

field_ns = Namespace('field', description='Field operations')

field_model = field_ns.model('Field', {
    'id': fields.Integer(readonly=True),
    'name': fields.String(required=True, description='Field name'),
    'description': fields.String(description='Field description'),
    'image_url': fields.String(description='Field image URL')
})

field_input_model = field_ns.model('FieldInput', {
    'name': fields.String(required=True, description='Field name'),
    'description': fields.String(description='Field description'),
    'image_url': fields.String(description='Field image URL')
})

field_list_model = field_ns.model('FieldList', {
    'fields': fields.List(fields.Nested(field_model))
}) 
