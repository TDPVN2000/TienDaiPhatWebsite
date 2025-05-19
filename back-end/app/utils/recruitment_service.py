from app.models.recruitment import Recruitment
from app.extensions import db

class RecruitmentService:
    @staticmethod
    def get_all():
        return Recruitment.query.all()

    @staticmethod
    def get_by_id(recruitment_id):
        return Recruitment.query.get(recruitment_id)

    @staticmethod
    def create(data):
        recruitment = Recruitment(**data)
        db.session.add(recruitment)
        db.session.commit()
        return recruitment

    @staticmethod
    def update(recruitment_id, data):
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return None
        for key, value in data.items():
            setattr(recruitment, key, value)
        db.session.commit()
        return recruitment

    @staticmethod
    def delete(recruitment_id):
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return False
        db.session.delete(recruitment)
        db.session.commit()
        return True 
