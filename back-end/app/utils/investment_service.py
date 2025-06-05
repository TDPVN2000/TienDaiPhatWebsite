from app.models.investment import Investment
from app.extensions import db
from .ckeditor_handler import CKEditorHandler

class InvestmentService:
    @staticmethod
    def get_all():
        return Investment.query.all()

    @staticmethod
    def get_by_id(investment_id):
        return Investment.query.get(investment_id)

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'content' in data:
            content = data['content']
            processed_content, _ = CKEditorHandler.process_content(content, 'investments')
            data['content'] = processed_content

        investment = Investment(**data)
        db.session.add(investment)
        db.session.commit()
        return investment

    @staticmethod
    def update(investment_id, data):
        investment = Investment.query.get(investment_id)
        if not investment:
            return None

        # Process CKEditor content if present
        if 'content' in data:
            old_content = investment.content
            processed_content, _ = CKEditorHandler.process_content(data['content'], 'investments')
            data['content'] = processed_content
            CKEditorHandler.cleanup_old_images(processed_content, old_content, 'investments')

        for key, value in data.items():
            setattr(investment, key, value)
        db.session.commit()
        return investment

    @staticmethod
    def delete(investment_id):
        investment = Investment.query.get(investment_id)
        if not investment:
            return False

        # Clean up images in content
        if investment.content:
            CKEditorHandler.cleanup_old_images('', investment.content, 'investments')

        db.session.delete(investment)
        db.session.commit()
        return True 
