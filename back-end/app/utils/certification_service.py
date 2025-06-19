from app.models.certification import Certification
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService

class CertificationService:
    @staticmethod
    def get_all():
        certifications = Certification.query.all()
        return [ContentHandler.process_model_for_display(certification.to_dict(), 'certifications') for certification in certifications]

    @staticmethod
    def get_by_id(certification_id):
        certification = Certification.query.get(certification_id)
        if not certification:
            return None
        return ContentHandler.process_model_for_display(certification.to_dict(), 'certifications')

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'certifications')
            data['content'] = processed_content

        certification = Certification(**data)
        db.session.add(certification)
        db.session.commit()
        return certification

    @staticmethod
    def update(certification_id, data):
        certification = Certification.query.get(certification_id)
        if not certification:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            certification.content, _ = CKEditorHandler.update_content_images(
                data['content'],
                certification.content,
                'certifications'
            )

        # Update basic fields
        for key, value in data.items():
            if key != 'translations':
                setattr(certification, key, value)

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
                if 'content' in trans:
                    # Process CKEditor content in translations
                    old_trans_content = TranslationService.get_translation(f"{certification.id}_content", lang, 'certification')
                    processed_trans_content, _ = CKEditorHandler.update_content_images(
                        trans['content'],
                        old_trans_content,
                        'certifications'
                    )
                    TranslationService.update_translation(
                        f"{certification.id}_content",
                        lang,
                        processed_trans_content,
                        'certification'
                    )

        db.session.commit()
        return certification

    @staticmethod
    def delete(certification_id):
        certification = Certification.query.get(certification_id)
        if not certification:
            return False

        # Clean up images in content
        if certification.content:
            CKEditorHandler.cleanup_old_images('', certification.content, 'certifications')

        db.session.delete(certification)
        db.session.commit()
        return True
