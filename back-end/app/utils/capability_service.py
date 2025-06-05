from app.models.capability import Capability
from app.extensions import db
from .ckeditor_handler import CKEditorHandler

class CapabilityService:
    @staticmethod
    def get_all():
        return Capability.query.all()

    @staticmethod
    def get_by_id(cap_id):
        return Capability.query.get(cap_id)

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'capabilities')
            data['content'] = processed_content

        cap = Capability(**data)
        db.session.add(cap)
        db.session.commit()
        return cap

    @staticmethod
    def update(cap_id, data):
        cap = Capability.query.get(cap_id)
        if not cap:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = cap.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'capabilities')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'capabilities')

        for key, value in data.items():
            setattr(cap, key, value)
        db.session.commit()
        return cap

    @staticmethod
    def delete(cap_id):
        cap = Capability.query.get(cap_id)
        if not cap:
            return False

        # Clean up images in content
        if cap.content:
            CKEditorHandler.cleanup_old_images('', cap.content, 'capabilities')

        db.session.delete(cap)
        db.session.commit()
        return True 
