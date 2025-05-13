from ..extensions import db
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id', ondelete='CASCADE'), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    year_completed = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    field = db.relationship('Field', backref='field_project')

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'year_completed': self.year_completed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        } 
