from app.models.capability import Capability
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class CapabilityService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        """Get all capabilities with optional language translation"""
        caps = Capability.query.all()
        result = []

        for cap in caps:
            cap_dict = cap.to_dict()
            if language:
                # Translate name and description
                cap_dict = TranslationService.translate_object(
                    cap_dict,
                    language,
                    ['name', 'description'],
                    'capability'
                )
            # Process content for display
            cap_dict = ContentHandler.process_model_for_display(cap_dict, 'capabilities')
            result.append(cap_dict)

        return result

    @staticmethod
    def get_by_id(cap_id, language: Optional[str] = None):
        """Get a capability by ID with optional language translation"""
        cap = Capability.query.get(cap_id)
        if not cap:
            return None

        cap_dict = cap.to_dict()
        if language:
            # Translate name and description
            cap_dict = TranslationService.translate_object(
                cap_dict,
                language,
                ['name', 'description'],
                'capability'
            )
        # Process content for display
        cap_dict = ContentHandler.process_model_for_display(cap_dict, 'capabilities')
        return cap_dict

    @staticmethod
    def create(data):
        """Create a new capability with translations"""
        # Process CKEditor content for description
        description = data.get('description', '')
        if description:
            processed_description, _ = CKEditorHandler.process_content(description, 'capabilities')
            data['description'] = processed_description

        cap = Capability(
            name=data.get('name'),
            description=data.get('description'),
            image_url=data.get('image_url'),
            field_id=data.get('field_id')
        )
        db.session.add(cap)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.create_translation(
                        f"{cap.id}_name",
                        lang,
                        trans['name'],
                        'capability'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    trans_description = trans['description']
                    processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'capabilities')
                    TranslationService.create_translation(
                        f"{cap.id}_description",
                        lang,
                        processed_trans_description,
                        'capability'
                    )

        return cap

    @staticmethod
    def update(cap_id, data):
        """Update a capability and its translations"""
        cap = Capability.query.get(cap_id)
        if not cap:
            return None

        if 'name' in data:
            cap.name = data['name']
        if 'description' in data:
            # Process CKEditor content and clean up old images
            cap.description, _ = CKEditorHandler.update_content_images(
                data['description'],
                cap.description,
                'capabilities'
            )
        if 'image_url' in data:
            cap.image_url = data['image_url']
        if 'field_id' in data:
            cap.field_id = data['field_id']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.update_translation(
                        f"{cap.id}_name",
                        lang,
                        trans['name'],
                        'capability'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    old_trans_description = TranslationService.get_translation(f"{cap.id}_description", lang, 'capability')
                    processed_trans_description, _ = CKEditorHandler.update_content_images(
                        trans['description'],
                        old_trans_description,
                        'capabilities'
                    )
                    TranslationService.update_translation(
                        f"{cap.id}_description",
                        lang,
                        processed_trans_description,
                        'capability'
                    )

        db.session.commit()
        return cap

    @staticmethod
    def delete(cap_id):
        """Delete a capability and its translations"""
        cap = Capability.query.get(cap_id)
        if not cap:
            return False

        # Clean up all images in the description
        CKEditorHandler.cleanup_old_images('', cap.description, 'capabilities')

        # Delete all translations for this capability
        for lang in TranslationService.get_all_languages():
            trans_description = TranslationService.get_translation(f"{cap.id}_description", lang, 'capability')
            if trans_description:
                CKEditorHandler.cleanup_old_images('', trans_description, 'capabilities')
            TranslationService.delete_translation(f"{cap.id}_name", lang, 'capability')
            TranslationService.delete_translation(f"{cap.id}_description", lang, 'capability')

        db.session.delete(cap)
        db.session.commit()
        return True
