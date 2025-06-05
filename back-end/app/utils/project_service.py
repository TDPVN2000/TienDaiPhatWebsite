from app.models.project import Project
from app.extensions import db
from .ckeditor_handler import CKEditorHandler

class ProjectService:
    @staticmethod
    def get_all():
        return Project.query.all()

    @staticmethod
    def get_by_id(project_id):
        return Project.query.get(project_id)

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'projects')
            data['content'] = processed_content

        project = Project(**data)
        db.session.add(project)
        db.session.commit()
        return project

    @staticmethod
    def update(project_id, data):
        project = Project.query.get(project_id)
        if not project:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = project.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'projects')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'projects')

        for key, value in data.items():
            setattr(project, key, value)
        db.session.commit()
        return project

    @staticmethod
    def delete(project_id):
        project = Project.query.get(project_id)
        if not project:
            return False

        # Clean up images in content
        if project.content:
            CKEditorHandler.cleanup_old_images('', project.content, 'projects')

        db.session.delete(project)
        db.session.commit()
        return True 
