from flask_restx import Namespace, fields

introduction_ns = Namespace('introduction', description='Introduction operations')

introduction_model = introduction_ns.model('Introduction', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Introduction title'),
    'content': fields.String(description='Introduction content')
})

introduction_input_model = introduction_ns.model('IntroductionInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Introduction title'),
    'content': fields.String(description='Introduction content')
})

introduction_list_model = introduction_ns.model('IntroductionList', {
    'introductions': fields.List(fields.Nested(introduction_model))
}) 
