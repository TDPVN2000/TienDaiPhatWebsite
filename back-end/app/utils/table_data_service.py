from app.models.table_data import TableData
from app.extensions import db

class TableDataService:
    @staticmethod
    def get_all():
        return TableData.query.all()

    @staticmethod
    def get_by_id(table_id):
        return TableData.query.get(table_id)

    @staticmethod
    def create(data):
        table = TableData(**data)
        db.session.add(table)
        db.session.commit()
        return table

    @staticmethod
    def update(table_id, data):
        table = TableData.query.get(table_id)
        if not table:
            return None
        for key, value in data.items():
            setattr(table, key, value)
        db.session.commit()
        return table

    @staticmethod
    def delete(table_id):
        table = TableData.query.get(table_id)
        if not table:
            return False
        db.session.delete(table)
        db.session.commit()
        return True 
