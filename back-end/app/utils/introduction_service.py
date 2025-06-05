from app.models.introduction import Introduction
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler

class IntroductionService:
    @staticmethod
    def get_all():
        intros = Introduction.query.all()
        return [ContentHandler.process_model_for_display(intro.to_dict(), 'introductions') for intro in intros]

    @staticmethod
    def get_by_id(intro_id):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return None
        return ContentHandler.process_model_for_display(intro.to_dict(), 'introductions')

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'introductions')
            data['content'] = processed_content

        intro = Introduction(**data)
        db.session.add(intro)
        db.session.commit()
        return intro

    @staticmethod
    def update(intro_id, data):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = intro.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'introductions')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'introductions')

        for key, value in data.items():
            setattr(intro, key, value)
        db.session.commit()
        return intro

    @staticmethod
    def delete(intro_id):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return False

        # Clean up images in content
        if intro.content:
            CKEditorHandler.cleanup_old_images('', intro.content, 'introductions')

        db.session.delete(intro)
        db.session.commit()
        return True 
