from ..extensions import db
from datetime import datetime

class Capability(db.Model):
    __tablename__ = 'capability'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    icon_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    field = db.relationship('Field', backref='field_capability')

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'icon_url': self.icon_url,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        } 
