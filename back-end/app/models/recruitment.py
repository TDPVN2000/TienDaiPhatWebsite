from ..extensions import db
from datetime import datetime

class Recruitment(db.Model):
    __tablename__ = 'recruitment'
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(255), nullable=False)
    des_position = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(50), default='active')  # active, inactive, closed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'position': self.position,
            'des_position': self.des_position,
            'address': self.address,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        } 
