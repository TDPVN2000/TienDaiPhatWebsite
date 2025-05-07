from flask import Blueprint, request
from flask_restx import Resource
from ..utils.product_service import ProductService
from ..models import Product
from ..extensions import db
from ..docs.api import product_ns, product_model
from . import BaseController

bp = Blueprint('product', __name__, url_prefix='/api/products')

@product_ns.route('/')
class ProductList(BaseController):
    @product_ns.doc('list_products')
    @product_ns.marshal_list_with(product_model)
    def get(self):
        """List all products"""
        products = ProductService.get_all()
        return [p.to_dict() for p in products]

    @product_ns.doc('create_product')
    @product_ns.expect(product_model)
    @product_ns.marshal_with(product_model, code=201)
    def post(self):
        """Create a new product"""
        data = request.get_json()
        product = ProductService.create(data)
        return product.to_dict(), 201

@product_ns.route('/<int:product_id>')
@product_ns.param('product_id', 'The product identifier')
class ProductResource(BaseController):
    @product_ns.doc('get_product')
    @product_ns.marshal_with(product_model)
    def get(self, product_id):
        """Get a product by ID"""
        product = ProductService.get_by_id(product_id)
        if not product:
            product_ns.abort(404, 'Product not found')
        return product.to_dict()

    @product_ns.doc('update_product')
    @product_ns.expect(product_model)
    @product_ns.marshal_with(product_model)
    def put(self, product_id):
        """Update a product"""
        data = request.get_json()
        product = ProductService.update(product_id, data)
        if not product:
            product_ns.abort(404, 'Product not found')
        return product.to_dict()

    @product_ns.doc('delete_product')
    @product_ns.response(204, 'Product deleted')
    def delete(self, product_id):
        """Delete a product"""
        success = ProductService.delete(product_id)
        if not success:
            product_ns.abort(404, 'Product not found')
        return '', 204 
