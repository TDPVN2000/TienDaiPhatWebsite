from ..extensions import db
from datetime import datetime

class Content(db.Model):
    """Model for storing content"""
    __tablename__ = 'contents'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='draft')
    content_type = db.Column(db.String(50), nullable=False)
    featured_image = db.Column(db.String(200))
    meta_description = db.Column(db.String(200))
    meta_keywords = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    translations = db.relationship('ContentTranslation', back_populates='content', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'status': self.status,
            'content_type': self.content_type,
            'featured_image': self.featured_image,
            'meta_description': self.meta_description,
            'meta_keywords': self.meta_keywords,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'translations': [t.to_dict() for t in self.translations]
        }

    def __repr__(self):
        return f'<Content {self.title}>'

class ContentTranslation(db.Model):
    """Model for storing content translations"""
    __tablename__ = 'content_translations'

    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    meta_description = db.Column(db.String(200))
    meta_keywords = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    content = db.relationship('Content', back_populates='translations')

    def to_dict(self):
        return {
            'id': self.id,
            'content_id': self.content_id,
            'language': self.language,
            'title': self.title,
            'content': self.content,
            'meta_description': self.meta_description,
            'meta_keywords': self.meta_keywords,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<ContentTranslation {self.title} ({self.language})>' 
 