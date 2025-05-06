from flask_restx import Namespace, fields

investment_ns = Namespace('investment', description='Investment operations')

investment_model = investment_ns.model('Investment', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Investment title'),
    'value': fields.String(description='Investment value'),
    'unit': fields.String(description='Investment unit'),
    'description': fields.String(description='Investment description')
})

investment_input_model = investment_ns.model('InvestmentInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Investment title'),
    'value': fields.String(description='Investment value'),
    'unit': fields.String(description='Investment unit'),
    'description': fields.String(description='Investment description')
})

investment_list_model = investment_ns.model('InvestmentList', {
    'investments': fields.List(fields.Nested(investment_model))
}) 
