from app.models.new import New
from ..extensions import db
from sqlalchemy.exc import SQLAlchemyError

class NewsService:
    @staticmethod
    def get_all():
        return New.query.order_by(New.created_at.desc()).all()

    @staticmethod
    def get_by_id(id):
        return New.query.get(id)

    @staticmethod
    def create(data):
        try:
            new = New(
                title=data['title'],
                description=data.get('description'),
                content=data['content'],
                image_url=data.get('image_url')
            )
            db.session.add(new)
            db.session.commit()
            return new
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def update(id, data):
        try:
            new = New.query.get(id)
            if not new:
                return None

            if 'title' in data:
                new.title = data['title']
            if 'description' in data:
                new.description = data['description']
            if 'content' in data:
                new.content = data['content']
            if 'image_url' in data:
                new.image_url = data['image_url']

            db.session.commit()
            return new
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

    @staticmethod
    def delete(id):
        try:
            new = New.query.get(id)
            if not new:
                return False

            db.session.delete(new)
            db.session.commit()
            return True
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e 
