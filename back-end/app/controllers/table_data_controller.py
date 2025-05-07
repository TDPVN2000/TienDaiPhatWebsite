from flask import Blueprint, request
from flask_restx import Resource
from ..utils.table_data_service import TableDataService
from ..models import TableData
from ..extensions import db
from ..docs.api import table_data_ns, table_data_model
from . import BaseController

bp = Blueprint('table_data', __name__, url_prefix='/api/table-data')

@table_data_ns.route('/')
class TableDataList(BaseController):
    @table_data_ns.doc('list_table_data')
    @table_data_ns.marshal_list_with(table_data_model)
    def get(self):
        """List all table data"""
        tables = TableDataService.get_all()
        return [t.to_dict() for t in tables]

    @table_data_ns.doc('create_table_data')
    @table_data_ns.expect(table_data_model)
    @table_data_ns.marshal_with(table_data_model, code=201)
    def post(self):
        """Create a new table data"""
        data = request.get_json()
        table = TableDataService.create(data)
        return table.to_dict(), 201

@table_data_ns.route('/<int:table_id>')
@table_data_ns.param('table_id', 'The table data identifier')
class TableDataResource(BaseController):
    @table_data_ns.doc('get_table_data')
    @table_data_ns.marshal_with(table_data_model)
    def get(self, table_id):
        """Get a table data by ID"""
        table = TableDataService.get_by_id(table_id)
        if not table:
            table_data_ns.abort(404, 'TableData not found')
        return table.to_dict()

    @table_data_ns.doc('update_table_data')
    @table_data_ns.expect(table_data_model)
    @table_data_ns.marshal_with(table_data_model)
    def put(self, table_id):
        """Update a table data"""
        data = request.get_json()
        table = TableDataService.update(table_id, data)
        if not table:
            table_data_ns.abort(404, 'TableData not found')
        return table.to_dict()

    @table_data_ns.doc('delete_table_data')
    @table_data_ns.response(204, 'TableData deleted')
    def delete(self, table_id):
        """Delete a table data"""
        success = TableDataService.delete(table_id)
        if not success:
            table_data_ns.abort(404, 'TableData not found')
        return '', 204 
