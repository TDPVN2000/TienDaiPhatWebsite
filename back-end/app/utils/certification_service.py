from app.models.certification import Certification
from app.extensions import db

class CertificationService:
    @staticmethod
    def get_all():
        return Certification.query.all()

    @staticmethod
    def get_by_id(cert_id):
        return Certification.query.get(cert_id)

    @staticmethod
    def create(data):
        cert = Certification(**data)
        db.session.add(cert)
        db.session.commit()
        return cert

    @staticmethod
    def update(cert_id, data):
        cert = Certification.query.get(cert_id)
        if not cert:
            return None
        for key, value in data.items():
            setattr(cert, key, value)
        db.session.commit()
        return cert

    @staticmethod
    def delete(cert_id):
        cert = Certification.query.get(cert_id)
        if not cert:
            return False
        db.session.delete(cert)
        db.session.commit()
        return True 
