from ..models import Field
from ..extensions import db

def get_all():
    return Field.query.all()

def get_by_id(field_id, include_children=False):
    field = Field.query.get(field_id)
    if field:
        return field.to_dict(include_children=include_children)
    return None

def create(data):
    field = Field(
        name=data.get('name'),
        description=data.get('description'),
        image_url=data.get('image_url')
    )
    db.session.add(field)
    db.session.commit()
    return field.to_dict()

def update(field_id, data):
    field = Field.query.get(field_id)
    if field:
        field.name = data.get('name', field.name)
        field.description = data.get('description', field.description)
        field.image_url = data.get('image_url', field.image_url)
        db.session.commit()
        return field.to_dict()
    return None

def delete(field_id):
    field = Field.query.get(field_id)
    if field:
        db.session.delete(field)
        db.session.commit()
        return True
    return False 
