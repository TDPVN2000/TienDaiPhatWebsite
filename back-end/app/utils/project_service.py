from app.models.project import Project
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class ProjectService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        projects = Project.query.all()
        result = []
        
        for project in projects:
            project_dict = project.to_dict()
            if language:
                # Translate name and description
                project_dict = TranslationService.translate_object(
                    project_dict,
                    language,
                    ['name', 'description'],
                    'project'
                )
            # Process content for display
            project_dict = ContentHandler.process_model_for_display(project_dict, 'projects')
            result.append(project_dict)
        
        return result

    @staticmethod
    def get_by_id(project_id, language: Optional[str] = None):
        project = Project.query.get(project_id)
        if not project:
            return None
            
        project_dict = project.to_dict()
        if language:
            # Translate name and description
            project_dict = TranslationService.translate_object(
                project_dict,
                language,
                ['name', 'description'],
                'project'
            )
        # Process content for display
        project_dict = ContentHandler.process_model_for_display(project_dict, 'projects')
        return project_dict

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'description' in data:
            description = data['description']
            processed_description, _ = CKEditorHandler.process_content(description, 'projects')
            data['description'] = processed_description

        project = Project(**data)
        db.session.add(project)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.create_translation(
                        f"{project.id}_name",
                        lang,
                        trans['name'],
                        'project'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    trans_description = trans['description']
                    processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'projects')
                    TranslationService.create_translation(
                        f"{project.id}_description",
                        lang,
                        processed_trans_description,
                        'project'
                    )

        return project

    @staticmethod
    def update(project_id, data):
        project = Project.query.get(project_id)
        if not project:
            return None

        # Process CKEditor content if present
        if 'description' in data:
            old_description = project.description
            processed_description, _ = CKEditorHandler.process_content(data['description'], 'projects')
            data['description'] = processed_description
            CKEditorHandler.cleanup_old_images(processed_description, old_description, 'projects')

        # Update basic fields
        for key, value in data.items():
            if key != 'translations':
                setattr(project, key, value)

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.update_translation(
                        f"{project.id}_name",
                        lang,
                        trans['name'],
                        'project'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    old_trans_description = TranslationService.get_translation(f"{project.id}_description", lang, 'project')
                    processed_trans_description, _ = CKEditorHandler.process_content(trans['description'], 'projects')
                    TranslationService.update_translation(
                        f"{project.id}_description",
                        lang,
                        processed_trans_description,
                        'project'
                    )
                    if old_trans_description:
                        CKEditorHandler.cleanup_old_images(processed_trans_description, old_trans_description, 'projects')

        db.session.commit()
        return project

    @staticmethod
    def delete(project_id):
        project = Project.query.get(project_id)
        if not project:
            return False

        # Clean up images in description
        if project.description:
            CKEditorHandler.cleanup_old_images('', project.description, 'projects')

        # Delete all translations for this project
        for lang in TranslationService.get_all_languages():
            trans_description = TranslationService.get_translation(f"{project.id}_description", lang, 'project')
            if trans_description:
                CKEditorHandler.cleanup_old_images('', trans_description, 'projects')
            TranslationService.delete_translation(f"{project.id}_name", lang, 'project')
            TranslationService.delete_translation(f"{project.id}_description", lang, 'project')

        db.session.delete(project)
        db.session.commit()
        return True 
