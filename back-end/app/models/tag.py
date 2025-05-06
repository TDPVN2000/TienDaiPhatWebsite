from ..extensions import db
from datetime import datetime

class Tag(db.Model):
    """Model for storing tags"""
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    translations = db.relationship('TagTranslation', back_populates='tag', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'translations': [t.to_dict() for t in self.translations]
        }

    def __repr__(self):
        return f'<Tag {self.name}>'

class TagTranslation(db.Model):
    """Model for storing tag translations"""
    __tablename__ = 'tag_translations'

    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tag = db.relationship('Tag', back_populates='translations')

    def to_dict(self):
        return {
            'id': self.id,
            'tag_id': self.tag_id,
            'language': self.language,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<TagTranslation {self.name} ({self.language})>' 
