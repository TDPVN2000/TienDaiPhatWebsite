from app.models.table_data import TableData
from app.extensions import db
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class TableDataService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        """Get all table data with optional language translation"""
        tables = TableData.query.all()
        result = []

        for table in tables:
            table_dict = table.to_dict()
            if language:
                # Translate name
                table_dict = TranslationService.translate_object(
                    table_dict,
                    language,
                    ['name'],
                    'table_data'
                )
            # Process content for display
            table_dict = ContentHandler.process_model_for_display(table_dict, 'table_data')
            result.append(table_dict)

        return result

    @staticmethod
    def get_by_id(table_id, language: Optional[str] = None):
        """Get table data by ID with optional language translation"""
        table = TableData.query.get(table_id)
        if not table:
            return None

        table_dict = table.to_dict()
        if language:
            # Translate name
            table_dict = TranslationService.translate_object(
                table_dict,
                language,
                ['name'],
                'table_data'
            )
        # Process content for display
        table_dict = ContentHandler.process_model_for_display(table_dict, 'table_data')
        return table_dict

    @staticmethod
    def create(data):
        """Create new table data with translations"""
        table = TableData(
            name=data.get('name'),
            data=data.get('data')
        )
        db.session.add(table)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.create_translation(
                        f"{table.id}_name",
                        lang,
                        trans['name'],
                        'table_data'
                    )

        return table

    @staticmethod
    def update(table_id, data):
        """Update table data and its translations"""
        table = TableData.query.get(table_id)
        if not table:
            return None

        if 'name' in data:
            table.name = data['name']
        if 'data' in data:
            table.data = data['data']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.update_translation(
                        f"{table.id}_name",
                        lang,
                        trans['name'],
                        'table_data'
                    )

        db.session.commit()
        return table

    @staticmethod
    def delete(table_id):
        """Delete table data and its translations"""
        table = TableData.query.get(table_id)
        if not table:
            return False

        # Delete all translations for this table data
        for lang in TranslationService.get_all_languages():
            TranslationService.delete_translation(f"{table.id}_name", lang, 'table_data')

        db.session.delete(table)
        db.session.commit()
        return True
