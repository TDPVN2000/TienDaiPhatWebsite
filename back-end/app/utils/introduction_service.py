from app.models.introduction import Introduction
from app.extensions import db

class IntroductionService:
    @staticmethod
    def get_all():
        return Introduction.query.all()

    @staticmethod
    def get_by_id(intro_id):
        return Introduction.query.get(intro_id)

    @staticmethod
    def create(data):
        intro = Introduction(**data)
        db.session.add(intro)
        db.session.commit()
        return intro

    @staticmethod
    def update(intro_id, data):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return None
        for key, value in data.items():
            setattr(intro, key, value)
        db.session.commit()
        return intro

    @staticmethod
    def delete(intro_id):
        intro = Introduction.query.get(intro_id)
        if not intro:
            return False
        db.session.delete(intro)
        db.session.commit()
        return True 
