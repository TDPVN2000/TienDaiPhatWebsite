from flask import Blueprint, request
from flask_restx import Resource
from ..utils.investment_service import InvestmentService
from ..models import Investment
from ..extensions import db
from ..docs.api import investment_ns, investment_model
from . import BaseController

bp = Blueprint('investment', __name__, url_prefix='/api/investments')

@investment_ns.route('/')
class InvestmentList(BaseController):
    @investment_ns.doc('list_investments')
    @investment_ns.marshal_list_with(investment_model)
    def get(self):
        """List all investments"""
        investments = InvestmentService.get_all()
        return [i.to_dict() for i in investments]

    @investment_ns.doc('create_investment')
    @investment_ns.expect(investment_model)
    @investment_ns.marshal_with(investment_model, code=201)
    def post(self):
        """Create a new investment"""
        data = request.get_json()
        investment = InvestmentService.create(data)
        return investment.to_dict(), 201

@investment_ns.route('/<int:investment_id>')
@investment_ns.param('investment_id', 'The investment identifier')
class InvestmentResource(BaseController):
    @investment_ns.doc('get_investment')
    @investment_ns.marshal_with(investment_model)
    def get(self, investment_id):
        """Get an investment by ID"""
        investment = InvestmentService.get_by_id(investment_id)
        if not investment:
            investment_ns.abort(404, 'Investment not found')
        return investment.to_dict()

    @investment_ns.doc('update_investment')
    @investment_ns.expect(investment_model)
    @investment_ns.marshal_with(investment_model)
    def put(self, investment_id):
        """Update an investment"""
        data = request.get_json()
        investment = InvestmentService.update(investment_id, data)
        if not investment:
            investment_ns.abort(404, 'Investment not found')
        return investment.to_dict()

    @investment_ns.doc('delete_investment')
    @investment_ns.response(204, 'Investment deleted')
    def delete(self, investment_id):
        """Delete an investment"""
        success = InvestmentService.delete(investment_id)
        if not success:
            investment_ns.abort(404, 'Investment not found')
        return '', 204 
