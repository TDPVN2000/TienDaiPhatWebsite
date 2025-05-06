from ..extensions import db
from datetime import datetime

class Translation(db.Model):
    """Model for storing translations"""
    __tablename__ = 'translations'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    value = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'language': self.language,
            'value': self.value,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Translation {self.key} ({self.language})>' 
