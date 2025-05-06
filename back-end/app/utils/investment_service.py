from app.models.investment import Investment
from app.extensions import db

class InvestmentService:
    @staticmethod
    def get_all():
        return Investment.query.all()

    @staticmethod
    def get_by_id(investment_id):
        return Investment.query.get(investment_id)

    @staticmethod
    def create(data):
        investment = Investment(**data)
        db.session.add(investment)
        db.session.commit()
        return investment

    @staticmethod
    def update(investment_id, data):
        investment = Investment.query.get(investment_id)
        if not investment:
            return None
        for key, value in data.items():
            setattr(investment, key, value)
        db.session.commit()
        return investment

    @staticmethod
    def delete(investment_id):
        investment = Investment.query.get(investment_id)
        if not investment:
            return False
        db.session.delete(investment)
        db.session.commit()
        return True 
