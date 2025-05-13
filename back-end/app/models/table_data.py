from ..extensions import db
from datetime import datetime

class TableData(db.Model):
    __tablename__ = 'table_data'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id', ondelete='CASCADE'), nullable=True)
    title = db.Column(db.String(255), nullable=False)
    data = db.Column(db.Text)  # Có thể lưu JSON, HTML, Markdown
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    field = db.relationship('Field', backref='field_table')

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'title': self.title,
            'data': self.data,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        } 
