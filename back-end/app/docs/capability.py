from flask_restx import Namespace, fields

capability_ns = Namespace('capability', description='Capability operations')

capability_model = capability_ns.model('Capability', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Capability name'),
    'icon_url': fields.String(description='Capability icon URL'),
    'description': fields.String(description='Capability description')
})

capability_input_model = capability_ns.model('CapabilityInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Capability name'),
    'icon_url': fields.String(description='Capability icon URL'),
    'description': fields.String(description='Capability description')
})

capability_list_model = capability_ns.model('CapabilityList', {
    'capabilities': fields.List(fields.Nested(capability_model))
}) 
