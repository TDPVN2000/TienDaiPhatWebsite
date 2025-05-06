from flask_restx import Namespace, fields

product_ns = Namespace('product', description='Product operations')

product_model = product_ns.model('Product', {
    'id': fields.Integer(readonly=True),
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Product name'),
    'description': fields.String(description='Product description'),
    'image_url': fields.String(description='Product image URL'),
    'features': fields.String(description='Product features')
})

product_input_model = product_ns.model('ProductInput', {
    'field_id': fields.Integer(required=True, description='Field ID'),
    'name': fields.String(required=True, description='Product name'),
    'description': fields.String(description='Product description'),
    'image_url': fields.String(description='Product image URL'),
    'features': fields.String(description='Product features')
})

product_list_model = product_ns.model('ProductList', {
    'products': fields.List(fields.Nested(product_model))
}) 
