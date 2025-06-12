from ..extensions import db
from datetime import datetime

class Translation(db.Model):
    __tablename__ = 'translations'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(255), nullable=False, index=True)
    language = db.Column(db.String(10), nullable=False, index=True)
    value = db.Column(db.Text, nullable=False)
    model_name = db.Column(db.String(50), nullable=False, index=True)  # Name of the model this translation belongs to
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('key', 'language', 'model_name', name='uix_translation_key_language_model'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'key': self.key,
            'language': self.language,
            'value': self.value,
            'model_name': self.model_name,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 
