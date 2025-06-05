from app.models.certification import Certification
from app.extensions import db
from .ckeditor_handler import CKEditorHandler

class CertificationService:
    @staticmethod
    def get_all():
        return Certification.query.all()

    @staticmethod
    def get_by_id(cert_id):
        return Certification.query.get(cert_id)

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'certifications')
            data['content'] = processed_content

        cert = Certification(**data)
        db.session.add(cert)
        db.session.commit()
        return cert

    @staticmethod
    def update(cert_id, data):
        cert = Certification.query.get(cert_id)
        if not cert:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = cert.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'certifications')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'certifications')

        for key, value in data.items():
            setattr(cert, key, value)
        db.session.commit()
        return cert

    @staticmethod
    def delete(cert_id):
        cert = Certification.query.get(cert_id)
        if not cert:
            return False

        # Clean up images in content
        if cert.content:
            CKEditorHandler.cleanup_old_images('', cert.content, 'certifications')

        db.session.delete(cert)
        db.session.commit()
        return True 
