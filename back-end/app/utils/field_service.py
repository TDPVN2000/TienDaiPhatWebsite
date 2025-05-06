from app.models.field import Field
from app.extensions import db

class FieldService:
    @staticmethod
    def get_all():
        return Field.query.all()

    @staticmethod
    def get_by_id(field_id):
        return Field.query.get(field_id)

    @staticmethod
    def create(data):
        field = Field(**data)
        db.session.add(field)
        db.session.commit()
        return field

    @staticmethod
    def update(field_id, data):
        field = Field.query.get(field_id)
        if not field:
            return None
        for key, value in data.items():
            setattr(field, key, value)
        db.session.commit()
        return field

    @staticmethod
    def delete(field_id):
        field = Field.query.get(field_id)
        if not field:
            return False
        db.session.delete(field)
        db.session.commit()
        return True 
