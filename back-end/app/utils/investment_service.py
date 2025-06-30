from app.models.investment import Investment
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class InvestmentService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        """Get all investments with optional language translation"""
        investments = Investment.query.all()
        result = []

        for investment in investments:
            investment_dict = investment.to_dict()
            if language:
                # Translate title, description, value, unit
                investment_dict = TranslationService.translate_object(
                    investment_dict,
                    language,
                    ['title', 'description', 'value', 'unit'],
                    'investment'
                )
            # Process content for display
            investment_dict = ContentHandler.process_model_for_display(investment_dict, 'investments')
            result.append(investment_dict)

        return result

    @staticmethod
    def get_by_id(investment_id, language: Optional[str] = None):
        """Get an investment by ID with optional language translation"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return None

        investment_dict = investment.to_dict()
        if language:
            # Translate title, description, value, unit
            investment_dict = TranslationService.translate_object(
                investment_dict,
                language,
                ['title', 'description', 'value', 'unit'],
                'investment'
            )
        # Process content for display
        investment_dict = ContentHandler.process_model_for_display(investment_dict, 'investments')
        return investment_dict

    @staticmethod
    def create(data):
        """Create a new investment with translations"""
        # Process CKEditor content for description
        description = data.get('description', '')
        if description:
            processed_description, _ = CKEditorHandler.process_content(description, 'investments')
            data['description'] = processed_description

        investment = Investment(
            title=data.get('title'),
            description=data.get('description'),
            value=data.get('value'),
            unit=data.get('unit'),
            field_id=data.get('field_id')
        )
        db.session.add(investment)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.create_translation(
                        f"{investment.id}_title",
                        lang,
                        trans['title'],
                        'investment'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    trans_description = trans['description']
                    processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'investments')
                    TranslationService.create_translation(
                        f"{investment.id}_description",
                        lang,
                        processed_trans_description,
                        'investment'
                    )
                if 'value' in trans:
                    TranslationService.create_translation(
                        f"{investment.id}_value",
                        lang,
                        trans['value'],
                        'investment'
                    )
                if 'unit' in trans:
                    TranslationService.create_translation(
                        f"{investment.id}_unit",
                        lang,
                        trans['unit'],
                        'investment'
                    )

        return investment

    @staticmethod
    def update(investment_id, data):
        """Update an investment and its translations"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return None

        if 'title' in data:
            investment.title = data['title']
        if 'description' in data:
            # Process CKEditor content and clean up old images
            investment.description, _ = CKEditorHandler.update_content_images(
                data['description'],
                investment.description,
                'investments'
            )
        if 'value' in data:
            investment.value = data['value']
        if 'unit' in data:
            investment.unit = data['unit']
        if 'field_id' in data:
            investment.field_id = data['field_id']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'title' in trans:
                    TranslationService.update_translation(
                        f"{investment.id}_title",
                        lang,
                        trans['title'],
                        'investment'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    old_trans_description = TranslationService.get_translation(f"{investment.id}_description", lang, 'investment')
                    processed_trans_description, _ = CKEditorHandler.update_content_images(
                        trans['description'],
                        old_trans_description,
                        'investments'
                    )
                    TranslationService.update_translation(
                        f"{investment.id}_description",
                        lang,
                        processed_trans_description,
                        'investment'
                    )
                if 'value' in trans:
                    TranslationService.update_translation(
                        f"{investment.id}_value",
                        lang,
                        trans['value'],
                        'investment'
                    )
                if 'unit' in trans:
                    TranslationService.update_translation(
                        f"{investment.id}_unit",
                        lang,
                        trans['unit'],
                        'investment'
                    )

        db.session.commit()
        return investment

    @staticmethod
    def delete(investment_id):
        """Delete an investment and its translations"""
        investment = Investment.query.get(investment_id)
        if not investment:
            return False

        # Clean up all images in the description
        CKEditorHandler.cleanup_old_images('', investment.description, 'investments')

        # Delete all translations for this investment
        for lang in TranslationService.get_all_languages():
            trans_description = TranslationService.get_translation(f"{investment.id}_description", lang, 'investment')
            if trans_description:
                CKEditorHandler.cleanup_old_images('', trans_description, 'investments')
            TranslationService.delete_translation(f"{investment.id}_title", lang, 'investment')
            TranslationService.delete_translation(f"{investment.id}_description", lang, 'investment')
            TranslationService.delete_translation(f"{investment.id}_value", lang, 'investment')
            TranslationService.delete_translation(f"{investment.id}_unit", lang, 'investment')

        db.session.delete(investment)
        db.session.commit()
        return True
