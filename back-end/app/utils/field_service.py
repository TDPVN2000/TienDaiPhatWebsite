from ..models import Field
from ..extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

def get_all(language: Optional[str] = None):
    fields = Field.query.all()
    result = []
    
    for field in fields:
        field_dict = field.to_dict()
        if language:
            # Translate name and description
            field_dict = TranslationService.translate_object(
                field_dict,
                language,
                ['name', 'description'],
                'field'
            )
        # Process content for display
        field_dict = ContentHandler.process_model_for_display(field_dict, 'fields')
        result.append(field_dict)
    
    return result

def get_by_id(field_id, include_children=False, language: Optional[str] = None):
    field = Field.query.get(field_id)
    if field:
        field_dict = field.to_dict(include_children=include_children)
        if language:
            # Translate name and description
            field_dict = TranslationService.translate_object(
                field_dict,
                language,
                ['name', 'description'],
                'field'
            )
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

    # Create translations if provided
    if 'translations' in data:
        for lang, trans in data['translations'].items():
            if 'name' in trans:
                TranslationService.create_translation(
                    f"{field.id}_name",
                    lang,
                    trans['name'],
                    'field'
                )
            if 'description' in trans:
                # Process CKEditor content in translations
                trans_description = trans['description']
                processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'fields')
                TranslationService.create_translation(
                    f"{field.id}_description",
                    lang,
                    processed_trans_description,
                    'field'
                )

    return field

def update(field_id, data):
    field = Field.query.get(field_id)
    if not field:
        return None

    # Process CKEditor content if present
    if 'description' in data:
        old_description = field.description
        processed_description, _ = CKEditorHandler.process_content(data['description'], 'fields')
        data['description'] = processed_description
        CKEditorHandler.cleanup_old_images(processed_description, old_description, 'fields')

    # Update basic fields
    for key, value in data.items():
        if key != 'translations':
            setattr(field, key, value)

    # Update translations if provided
    if 'translations' in data:
        for lang, trans in data['translations'].items():
            if 'name' in trans:
                TranslationService.update_translation(
                    f"{field.id}_name",
                    lang,
                    trans['name'],
                    'field'
                )
            if 'description' in trans:
                # Process CKEditor content in translations
                old_trans_description = TranslationService.get_translation(f"{field.id}_description", lang, 'field')
                processed_trans_description, _ = CKEditorHandler.process_content(trans['description'], 'fields')
                TranslationService.update_translation(
                    f"{field.id}_description",
                    lang,
                    processed_trans_description,
                    'field'
                )
                if old_trans_description:
                    CKEditorHandler.cleanup_old_images(processed_trans_description, old_trans_description, 'fields')

    db.session.commit()
    return field

def delete(field_id):
    field = Field.query.get(field_id)
    if not field:
        return False

    # Clean up images in description
    if field.description:
        CKEditorHandler.cleanup_old_images('', field.description, 'fields')

    # Delete all translations for this field
    for lang in TranslationService.get_all_languages():
        trans_description = TranslationService.get_translation(f"{field.id}_description", lang, 'field')
        if trans_description:
            CKEditorHandler.cleanup_old_images('', trans_description, 'fields')
        TranslationService.delete_translation(f"{field.id}_name", lang, 'field')
        TranslationService.delete_translation(f"{field.id}_description", lang, 'field')

    db.session.delete(field)
    db.session.commit()
    return True 
