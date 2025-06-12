from app.models.introduction import Introduction
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class IntroductionService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        intros = Introduction.query.all()
        result = []
        
        for intro in intros:
            intro_dict = intro.to_dict()
            if language:
                # Translate title and content
                intro_dict = TranslationService.translate_object(
                    intro_dict,
                    language,
                    ['title', 'content'],
                    'introduction'
                )
            # Process content for display
            intro_dict = ContentHandler.process_model_for_display(intro_dict, 'introductions')
            result.append(intro_dict)
        
        return result

    @staticmethod
    def get_by_id(intro_id, language: Optional[str] = None):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return None
            
        intro_dict = intro.to_dict()
        if language:
            # Translate title and content
            intro_dict = TranslationService.translate_object(
                intro_dict,
                language,
                ['title', 'content'],
                'introduction'
            )
        # Process content for display
        intro_dict = ContentHandler.process_model_for_display(intro_dict, 'introductions')
        return intro_dict

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

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.create_translation(
                        f"{intro.id}_title",
                        lang,
                        trans['title'],
                        'introduction'
                    )
                if 'content' in trans:
                    # Process CKEditor content in translations
                    trans_content = trans['content']
                    processed_trans_content, _ = CKEditorHandler.process_content(trans_content, 'introductions')
                    TranslationService.create_translation(
                        f"{intro.id}_content",
                        lang,
                        processed_trans_content,
                        'introduction'
                    )

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

        # Update basic fields
        for key, value in data.items():
            if key != 'translations':
                setattr(intro, key, value)

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.update_translation(
                        f"{intro.id}_title",
                        lang,
                        trans['title'],
                        'introduction'
                    )
                if 'content' in trans:
                    # Process CKEditor content in translations
                    old_trans_content = TranslationService.get_translation(f"{intro.id}_content", lang, 'introduction')
                    processed_trans_content, _ = CKEditorHandler.process_content(trans['content'], 'introductions')
                    TranslationService.update_translation(
                        f"{intro.id}_content",
                        lang,
                        processed_trans_content,
                        'introduction'
                    )
                    if old_trans_content:
                        CKEditorHandler.cleanup_old_images(processed_trans_content, old_trans_content, 'introductions')

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

        # Delete all translations for this introduction
        for lang in TranslationService.get_all_languages():
            trans_content = TranslationService.get_translation(f"{intro.id}_content", lang, 'introduction')
            if trans_content:
                CKEditorHandler.cleanup_old_images('', trans_content, 'introductions')
            TranslationService.delete_translation(f"{intro.id}_title", lang, 'introduction')
            TranslationService.delete_translation(f"{intro.id}_content", lang, 'introduction')

        db.session.delete(intro)
        db.session.commit()
        return True 
