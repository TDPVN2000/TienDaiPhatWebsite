from app.models.certification import Certification
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler

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
            old_content = certification.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'certifications')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'certifications')

        for key, value in data.items():
            setattr(certification, key, value)
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
