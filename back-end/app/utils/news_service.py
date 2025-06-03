from ..models import New
from ..extensions import db
from .translation_service import TranslationService
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
        return news_dict

    @staticmethod
    def create(data: dict) -> New:
        """Create a new news item with translations"""
        news = New(
            title=data['title'],
            content=data['content'],
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
                    TranslationService.create_translation(
                        f"{news.id}_content",
                        lang,
                        trans['content']
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
            news.content = data['content']
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
                    TranslationService.update_translation(
                        f"{news.id}_content",
                        lang,
                        trans['content']
                    )

        db.session.commit()
        return news

    @staticmethod
    def delete(news_id: int) -> bool:
        """Delete a news item and its translations"""
        news = New.query.get(news_id)
        if not news:
            return False

        # Delete all translations for this news item
        for lang in TranslationService.get_all_languages():
            TranslationService.delete_translation(f"{news.id}_title", lang)
            TranslationService.delete_translation(f"{news.id}_content", lang)

        db.session.delete(news)
        db.session.commit()
        return True 
