from ..extensions import db
from datetime import datetime

class Investment(db.Model):
    __tablename__ = 'investment'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    value = db.Column(db.String(255))
    unit = db.Column(db.String(50))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    field = db.relationship('Field', backref='field_investment')

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'title': self.title,
            'value': self.value,
            'unit': self.unit,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        } 
