from app.models.capability import Capability
from app.extensions import db

class CapabilityService:
    @staticmethod
    def get_all():
        return Capability.query.all()

    @staticmethod
    def get_by_id(cap_id):
        return Capability.query.get(cap_id)

    @staticmethod
    def create(data):
        cap = Capability(**data)
        db.session.add(cap)
        db.session.commit()
        return cap

    @staticmethod
    def update(cap_id, data):
        cap = Capability.query.get(cap_id)
        if not cap:
            return None
        for key, value in data.items():
            setattr(cap, key, value)
        db.session.commit()
        return cap

    @staticmethod
    def delete(cap_id):
        cap = Capability.query.get(cap_id)
        if not cap:
            return False
        db.session.delete(cap)
        db.session.commit()
        return True 
