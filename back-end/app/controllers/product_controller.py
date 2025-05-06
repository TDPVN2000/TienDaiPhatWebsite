from flask import Blueprint, request
from flask_restx import Resource
from ..utils.product_service import ProductService
from ..models import Product
from ..extensions import db
from . import BaseController

bp = Blueprint('product', __name__)

class ProductController(BaseController):
    def get(self, product_id=None):
        if product_id:
            product = ProductService.get_by_id(product_id)
            if not product:
                return self.not_found_response('Product not found')
            return self.success_response(product.to_dict())
        products = ProductService.get_all()
        return self.success_response([p.to_dict() for p in products])

    def post(self):
        data = request.get_json()
        product = ProductService.create(data)
        return self.success_response(product.to_dict(), 'Product created', 201)

    def put(self, product_id):
        data = request.get_json()
        product = ProductService.update(product_id, data)
        if not product:
            return self.not_found_response('Product not found')
        return self.success_response(product.to_dict(), 'Product updated')

    def delete(self, product_id):
        success = ProductService.delete(product_id)
        if not success:
            return self.not_found_response('Product not found')
        return self.success_response(None, 'Product deleted') 
