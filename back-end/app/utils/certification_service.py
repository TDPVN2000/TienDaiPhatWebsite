from app.models.certification import Certification
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class CertificationService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        """Get all certifications with optional language translation"""
        certifications = Certification.query.all()
        result = []

        for certification in certifications:
            certification_dict = certification.to_dict()
            if language:
                # Translate name and description
                certification_dict = TranslationService.translate_object(
                    certification_dict,
                    language,
                    ['name', 'description'],
                    'certification'
                )
            # Process content for display
            certification_dict = ContentHandler.process_model_for_display(certification_dict, 'certifications')
            result.append(certification_dict)

        return result

    @staticmethod
    def get_by_id(certification_id, language: Optional[str] = None):
        """Get a certification by ID with optional language translation"""
        certification = Certification.query.get(certification_id)
        if not certification:
            return None

        certification_dict = certification.to_dict()
        if language:
            # Translate name and description
            certification_dict = TranslationService.translate_object(
                certification_dict,
                language,
                ['name', 'description'],
                'certification'
            )
        # Process content for display
        certification_dict = ContentHandler.process_model_for_display(certification_dict, 'certifications')
        return certification_dict

    @staticmethod
    def create(data):
        """Create a new certification with translations"""
        # Process CKEditor content for description
        description = data.get('description', '')
        if description:
            processed_description, _ = CKEditorHandler.process_content(description, 'certifications')
            data['description'] = processed_description

        certification = Certification(
            name=data.get('name'),
            description=data.get('description'),
            image_url=data.get('image_url'),
            field_id=data.get('field_id')
        )
        db.session.add(certification)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.create_translation(
                        f"{certification.id}_name",
                        lang,
                        trans['name'],
                        'certification'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    trans_description = trans['description']
                    processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'certifications')
                    TranslationService.create_translation(
                        f"{certification.id}_description",
                        lang,
                        processed_trans_description,
                        'certification'
                    )

        return certification

    @staticmethod
    def update(certification_id, data):
        """Update a certification and its translations"""
        certification = Certification.query.get(certification_id)
        if not certification:
            return None

        if 'name' in data:
            certification.name = data['name']
        if 'description' in data:
            # Process CKEditor content and clean up old images
            certification.description, _ = CKEditorHandler.update_content_images(
                data['description'],
                certification.description,
                'certifications'
            )
        if 'image_url' in data:
            certification.image_url = data['image_url']
        if 'field_id' in data:
            certification.field_id = data['field_id']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.update_translation(
                        f"{certification.id}_name",
                        lang,
                        trans['name'],
                        'certification'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    old_trans_description = TranslationService.get_translation(f"{certification.id}_description", lang, 'certification')
                    processed_trans_description, _ = CKEditorHandler.update_content_images(
                        trans['description'],
                        old_trans_description,
                        'certifications'
                    )
                    TranslationService.update_translation(
                        f"{certification.id}_description",
                        lang,
                        processed_trans_description,
                        'certification'
                    )

        db.session.commit()
        return certification

    @staticmethod
    def delete(certification_id):
        """Delete a certification and its translations"""
        certification = Certification.query.get(certification_id)
        if not certification:
            return False

        # Clean up all images in the description
        CKEditorHandler.cleanup_old_images('', certification.description, 'certifications')

        # Delete all translations for this certification
        for lang in TranslationService.get_all_languages():
            trans_description = TranslationService.get_translation(f"{certification.id}_description", lang, 'certification')
            if trans_description:
                CKEditorHandler.cleanup_old_images('', trans_description, 'certifications')
            TranslationService.delete_translation(f"{certification.id}_name", lang, 'certification')
            TranslationService.delete_translation(f"{certification.id}_description", lang, 'certification')

        db.session.delete(certification)
        db.session.commit()
        return True
