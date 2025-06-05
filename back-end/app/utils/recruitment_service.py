from app.models.recruitment import Recruitment
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler

class RecruitmentService:
    @staticmethod
    def get_all():
        recruitments = Recruitment.query.all()
        return [ContentHandler.process_model_for_display(recruitment.to_dict(), 'recruitments') for recruitment in recruitments]

    @staticmethod
    def get_by_id(recruitment_id):
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return None
        return ContentHandler.process_model_for_display(recruitment.to_dict(), 'recruitments')

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'recruitments')
            data['content'] = processed_content

        recruitment = Recruitment(**data)
        db.session.add(recruitment)
        db.session.commit()
        return recruitment

    @staticmethod
    def update(recruitment_id, data):
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = recruitment.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'recruitments')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'recruitments')

        for key, value in data.items():
            setattr(recruitment, key, value)
        db.session.commit()
        return recruitment

    @staticmethod
    def delete(recruitment_id):
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return False

        # Clean up images in content
        if recruitment.content:
            CKEditorHandler.cleanup_old_images('', recruitment.content, 'recruitments')

        db.session.delete(recruitment)
        db.session.commit()
        return True 
