from app.models.project import Project
from app.extensions import db

class ProjectService:
    @staticmethod
    def get_all():
        return Project.query.all()

    @staticmethod
    def get_by_id(project_id):
        return Project.query.get(project_id)

    @staticmethod
    def create(data):
        project = Project(**data)
        db.session.add(project)
        db.session.commit()
        return project

    @staticmethod
    def update(project_id, data):
        project = Project.query.get(project_id)
        if not project:
            return None
        for key, value in data.items():
            setattr(project, key, value)
        db.session.commit()
        return project

    @staticmethod
    def delete(project_id):
        project = Project.query.get(project_id)
        if not project:
            return False
        db.session.delete(project)
        db.session.commit()
        return True 
