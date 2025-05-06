from flask_restx import Namespace, fields

table_data_ns = Namespace('table_data', description='TableData operations')

table_data_model = table_data_ns.model('TableData', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Table title'),
    'data': fields.String(description='Table data')
})

table_data_input_model = table_data_ns.model('TableDataInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'title': fields.String(required=True, description='Table title'),
    'data': fields.String(description='Table data')
})

table_data_list_model = table_data_ns.model('TableDataList', {
    'tables': fields.List(fields.Nested(table_data_model))
}) 
