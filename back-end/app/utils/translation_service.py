from ..models import Translation
from ..extensions import db
from typing import Dict, Optional, List

class TranslationService:
    @staticmethod
    def get_translation(key: str, language: str, model_name: str) -> Optional[str]:
        """Get a translation for a specific key, language and model"""
        translation = Translation.query.filter_by(key=key, language=language, model_name=model_name).first()
        return translation.value if translation else None

    @staticmethod
    def get_translations_for_language(language: str, model_name: Optional[str] = None) -> Dict[str, str]:
        """Get all translations for a specific language and optionally filter by model"""
        query = Translation.query.filter_by(language=language)
        if model_name:
            query = query.filter_by(model_name=model_name)
        translations = query.all()
        return {t.key: t.value for t in translations}

    @staticmethod
    def create_translation(key: str, language: str, value: str, model_name: str) -> Translation:
        """Create a new translation"""
        translation = Translation(key=key, language=language, value=value, model_name=model_name)
        db.session.add(translation)
        db.session.commit()
        return translation

    @staticmethod
    def update_translation(key: str, language: str, value: str, model_name: str) -> Optional[Translation]:
        """Update an existing translation"""
        translation = Translation.query.filter_by(key=key, language=language, model_name=model_name).first()
        if translation:
            translation.value = value
            db.session.commit()
        return translation

    @staticmethod
    def delete_translation(key: str, language: str, model_name: str) -> bool:
        """Delete a translation"""
        translation = Translation.query.filter_by(key=key, language=language, model_name=model_name).first()
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
    def translate_object(obj: dict, language: str, translation_keys: List[str], model_name: str) -> dict:
        """Translate specific fields in an object based on translation keys"""
        result = obj.copy()
        for key in translation_keys:
            if key in obj:
                translation_key = f"{obj['id']}_{key}"
                translated_value = TranslationService.get_translation(translation_key, language, model_name)
                if translated_value:
                    result[key] = translated_value
        return result 
