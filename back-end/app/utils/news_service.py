from ..models import New
from ..extensions import db
from .translation_service import TranslationService
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from typing import List, Optional

class NewsService:
    @staticmethod
    def get_all(language: Optional[str] = None) -> List[dict]:
        """Get all news items with optional language translation"""
        news_items = New.query.all()
        result = []
        
        for news in news_items:
            news_dict = news.to_dict()
            if language:
                # Translate title and content
                news_dict = TranslationService.translate_object(
                    news_dict,
                    language,
                    ['title', 'content']
                )
            # Process content for display
            news_dict = ContentHandler.process_model_for_display(news_dict, 'news')
            result.append(news_dict)
        
        return result

    @staticmethod
    def get_by_id(news_id: int, language: Optional[str] = None) -> Optional[dict]:
        """Get a news item by ID with optional language translation"""
        news = New.query.get(news_id)
        if not news:
            return None
            
        news_dict = news.to_dict()
        if language:
            # Translate title and content
            news_dict = TranslationService.translate_object(
                news_dict,
                language,
                ['title', 'content']
            )
        # Process content for display
        news_dict = ContentHandler.process_model_for_display(news_dict, 'news')
        return news_dict

    @staticmethod
    def create(data: dict) -> New:
        """Create a new news item with translations"""
        # Process CKEditor content
        content = data.get('content', '')
        processed_content, _ = CKEditorHandler.process_content(content, 'news')
        
        news = New(
            title=data['title'],
            content=processed_content,
            image_url=data.get('image_url')
        )
        db.session.add(news)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.create_translation(
                        f"{news.id}_title",
                        lang,
                        trans['title']
                    )
                if 'content' in trans:
                    # Process CKEditor content in translations
                    trans_content = trans['content']
                    processed_trans_content, _ = CKEditorHandler.process_content(trans_content, 'news')
                    TranslationService.create_translation(
                        f"{news.id}_content",
                        lang,
                        processed_trans_content
                    )

        return news

    @staticmethod
    def update(news_id: int, data: dict) -> Optional[New]:
        """Update a news item and its translations"""
        news = New.query.get(news_id)
        if not news:
            return None

        if 'title' in data:
            news.title = data['title']
        if 'content' in data:
            # Process CKEditor content and clean up old images
            old_content = news.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'news')
            news.content = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'news')
        if 'image_url' in data:
            news.image_url = data['image_url']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.update_translation(
                        f"{news.id}_title",
                        lang,
                        trans['title']
                    )
                if 'content' in trans:
                    # Process CKEditor content in translations
                    old_trans_content = TranslationService.get_translation(f"{news.id}_content", lang)
                    processed_trans_content, _ = CKEditorHandler.process_content(trans['content'], 'news')
                    TranslationService.update_translation(
                        f"{news.id}_content",
                        lang,
                        processed_trans_content
                    )
                    if old_trans_content:
                        CKEditorHandler.cleanup_old_images(processed_trans_content, old_trans_content, 'news')

        db.session.commit()
        return news

    @staticmethod
    def delete(news_id: int) -> bool:
        """Delete a news item and its translations"""
        news = New.query.get(news_id)
        if not news:
            return False

        # Clean up all images in the content
        CKEditorHandler.cleanup_old_images('', news.content, 'news')

        # Delete all translations for this news item
        for lang in TranslationService.get_all_languages():
            trans_content = TranslationService.get_translation(f"{news.id}_content", lang)
            if trans_content:
                CKEditorHandler.cleanup_old_images('', trans_content, 'news')
            TranslationService.delete_translation(f"{news.id}_title", lang)
            TranslationService.delete_translation(f"{news.id}_content", lang)

        db.session.delete(news)
        db.session.commit()
        return True 
