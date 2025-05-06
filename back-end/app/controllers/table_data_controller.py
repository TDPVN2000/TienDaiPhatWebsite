from flask import Blueprint, request
from flask_restx import Resource
from ..utils.table_data_service import TableDataService
from ..models import TableData
from ..extensions import db
from . import BaseController

bp = Blueprint('table_data', __name__)

class TableDataController(BaseController):
    def get(self, table_id=None):
        if table_id:
            table = TableDataService.get_by_id(table_id)
            if not table:
                return self.not_found_response('TableData not found')
            return self.success_response(table.to_dict())
        tables = TableDataService.get_all()
        return self.success_response([t.to_dict() for t in tables])

    def post(self):
        data = request.get_json()
        table = TableDataService.create(data)
        return self.success_response(table.to_dict(), 'TableData created', 201)

    def put(self, table_id):
        data = request.get_json()
        table = TableDataService.update(table_id, data)
        if not table:
            return self.not_found_response('TableData not found')
        return self.success_response(table.to_dict(), 'TableData updated')

    def delete(self, table_id):
        success = TableDataService.delete(table_id)
        if not success:
            return self.not_found_response('TableData not found')
        return self.success_response(None, 'TableData deleted') 
