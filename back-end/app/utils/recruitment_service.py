from app.models.recruitment import Recruitment
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService

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
            recruitment.content, _ = CKEditorHandler.update_content_images(
                data['content'],
                recruitment.content,
                'recruitments'
            )

        # Update basic fields
        for key, value in data.items():
            if key != 'translations':
                setattr(recruitment, key, value)

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.update_translation(
                        f"{recruitment.id}_title",
                        lang,
                        trans['title'],
                        'recruitment'
                    )
                if 'content' in trans:
                    # Process CKEditor content in translations
                    old_trans_content = TranslationService.get_translation(f"{recruitment.id}_content", lang, 'recruitment')
                    processed_trans_content, _ = CKEditorHandler.update_content_images(
                        trans['content'],
                        old_trans_content,
                        'recruitments'
                    )
                    TranslationService.update_translation(
                        f"{recruitment.id}_content",
                        lang,
                        processed_trans_content,
                        'recruitment'
                    )

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
