from ..models import Field
from ..extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler

def get_all():
    fields = Field.query.all()
    return [ContentHandler.process_model_for_display(field.to_dict(), 'fields') for field in fields]

def get_by_id(field_id, include_children=False):
    field = Field.query.get(field_id)
    if field:
        field_dict = field.to_dict(include_children=include_children)
        return ContentHandler.process_model_for_display(field_dict, 'fields')
    return None

def create(data):
    # Process CKEditor content
    description = data.get('description', '')
    if description:
        processed_description, _ = CKEditorHandler.process_content(description, 'fields')
        data['description'] = processed_description

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
        # Process CKEditor content if present
        if 'description' in data:
            old_description = field.description
            processed_description, _ = CKEditorHandler.process_content(data['description'], 'fields')
            data['description'] = processed_description
            CKEditorHandler.cleanup_old_images(processed_description, old_description, 'fields')

        field.name = data.get('name', field.name)
        field.description = data.get('description', field.description)
        field.image_url = data.get('image_url', field.image_url)
        db.session.commit()
        return field.to_dict()
    return None

def delete(field_id):
    field = Field.query.get(field_id)
    if field:
        # Clean up images in description
        if field.description:
            CKEditorHandler.cleanup_old_images('', field.description, 'fields')
        db.session.delete(field)
        db.session.commit()
        return True
    return False 
