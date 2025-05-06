from flask import Blueprint, request
from flask_restx import Resource
from ..utils.investment_service import InvestmentService
from ..models import Investment
from ..extensions import db
from . import BaseController

bp = Blueprint('investment', __name__)

class InvestmentController(BaseController):
    def get(self, investment_id=None):
        if investment_id:
            investment = InvestmentService.get_by_id(investment_id)
            if not investment:
                return self.not_found_response('Investment not found')
            return self.success_response(investment.to_dict())
        investments = InvestmentService.get_all()
        return self.success_response([i.to_dict() for i in investments])

    def post(self):
        data = request.get_json()
        investment = InvestmentService.create(data)
        return self.success_response(investment.to_dict(), 'Investment created', 201)

    def put(self, investment_id):
        data = request.get_json()
        investment = InvestmentService.update(investment_id, data)
        if not investment:
            return self.not_found_response('Investment not found')
        return self.success_response(investment.to_dict(), 'Investment updated')

    def delete(self, investment_id):
        success = InvestmentService.delete(investment_id)
        if not success:
            return self.not_found_response('Investment not found')
        return self.success_response(None, 'Investment deleted') 
