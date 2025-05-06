from datetime import datetime
from app import db
from flask_babel import gettext as _
from werkzeug.security import generate_password_hash, check_password_hash

class BaseModel(db.Model):
    """Base model class that includes CRUD operations"""
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class User(db.Model):
    """User model for authentication and authorization"""
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    contents = db.relationship('Content', backref='author', lazy=True)

    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check password hash"""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_active': self.is_active,
            'is_admin': self.is_admin,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'avatar': self.avatar,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Content(db.Model):
    """Content model for articles, pages, etc."""
    __tablename__ = 'content'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='draft')
    content_type = db.Column(db.String(50), nullable=False)
    featured_image = db.Column(db.String(255))
    meta_description = db.Column(db.String(255))
    meta_keywords = db.Column(db.String(255))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    translations = db.relationship('ContentTranslation', back_populates='content_item', cascade='all, delete-orphan')
    categories = db.relationship('Category', secondary='content_category', backref=db.backref('contents', lazy='dynamic'))
    tags = db.relationship('Tag', secondary='content_tag', backref=db.backref('contents', lazy='dynamic'))

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'status': self.status,
            'content_type': self.content_type,
            'featured_image': self.featured_image,
            'meta_description': self.meta_description,
            'meta_keywords': self.meta_keywords,
            'author_id': self.author_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'translations': [t.to_dict() for t in self.translations],
            'categories': [c.to_dict() for c in self.categories],
            'tags': [t.to_dict() for t in self.tags]
        }

class ContentTranslation(db.Model):
    """Content translation model"""
    __tablename__ = 'content_translation'

    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    meta_description = db.Column(db.String(255))
    meta_keywords = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    content_item = db.relationship('Content', back_populates='translations')

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'content_id': self.content_id,
            'language': self.language,
            'title': self.title,
            'body': self.body,
            'meta_description': self.meta_description,
            'meta_keywords': self.meta_keywords,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Category(db.Model):
    """Category model for content categorization"""
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    translations = db.relationship('CategoryTranslation', back_populates='category_item', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'translations': [t.to_dict() for t in self.translations]
        }

class CategoryTranslation(db.Model):
    """Category translation model"""
    __tablename__ = 'category_translation'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    category_item = db.relationship('Category', back_populates='translations')

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'category_id': self.category_id,
            'language': self.language,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Tag(db.Model):
    """Tag model for content tagging"""
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    translations = db.relationship('TagTranslation', back_populates='tag_item', cascade='all, delete-orphan')

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'translations': [t.to_dict() for t in self.translations]
        }

class TagTranslation(db.Model):
    """Tag translation model"""
    __tablename__ = 'tag_translation'

    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    language = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tag_item = db.relationship('Tag', back_populates='translations')

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'tag_id': self.tag_id,
            'language': self.language,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

# Association tables for many-to-many relationships
content_category = db.Table('content_category',
    db.Column('content_id', db.Integer, db.ForeignKey('content.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)

content_tag = db.Table('content_tag',
    db.Column('content_id', db.Integer, db.ForeignKey('content.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)
