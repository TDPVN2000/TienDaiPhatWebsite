from ..models import Translation
from ..extensions import db
from typing import Dict, Optional, List

class TranslationService:
    @staticmethod
    def get_translation(key: str, language: str) -> Optional[str]:
        """Get a translation for a specific key and language"""
        translation = Translation.query.filter_by(key=key, language=language).first()
        return translation.value if translation else None

    @staticmethod
    def get_translations_for_language(language: str) -> Dict[str, str]:
        """Get all translations for a specific language"""
        translations = Translation.query.filter_by(language=language).all()
        return {t.key: t.value for t in translations}

    @staticmethod
    def create_translation(key: str, language: str, value: str) -> Translation:
        """Create a new translation"""
        translation = Translation(key=key, language=language, value=value)
        db.session.add(translation)
        db.session.commit()
        return translation

    @staticmethod
    def update_translation(key: str, language: str, value: str) -> Optional[Translation]:
        """Update an existing translation"""
        translation = Translation.query.filter_by(key=key, language=language).first()
        if translation:
            translation.value = value
            db.session.commit()
        return translation

    @staticmethod
    def delete_translation(key: str, language: str) -> bool:
        """Delete a translation"""
        translation = Translation.query.filter_by(key=key, language=language).first()
        if translation:
            db.session.delete(translation)
            db.session.commit()
            return True
        return False

    @staticmethod
    def get_all_languages() -> List[str]:
        """Get all available languages"""
        return db.session.query(Translation.language).distinct().all()

    @staticmethod
    def translate_object(obj: dict, language: str, translation_keys: List[str]) -> dict:
        """Translate specific fields in an object based on translation keys"""
        result = obj.copy()
        for key in translation_keys:
            if key in obj:
                translation_key = f"{obj['id']}_{key}"
                translated_value = TranslationService.get_translation(translation_key, language)
                if translated_value:
                    result[key] = translated_value
        return result 
