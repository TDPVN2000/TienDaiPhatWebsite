from flask import current_app
from flask_babel import Babel, gettext as _
from app import db
from app.models.translation import Translation

babel = Babel()

def init_app(app):
    """Initialize Babel with the Flask app"""
    babel.init_app(app)
    
    @babel.localeselector
    def get_locale():
        # You can implement custom locale selection logic here
        # For now, we'll use the default locale from config
        return app.config['BABEL_DEFAULT_LOCALE']

def get_translation(key, language=None):
    """Get a translation for a given key and language"""
    if not language:
        language = current_app.config['BABEL_DEFAULT_LOCALE']
    
    translation = Translation.query.filter_by(
        key=key,
        language=language
    ).first()
    
    if translation:
        return translation.value
    return key

def get_all_translations(language=None):
    """Get all translations for a given language"""
    if not language:
        language = current_app.config['BABEL_DEFAULT_LOCALE']
    
    translations = Translation.query.filter_by(language=language).all()
    return {t.key: t.value for t in translations}

def add_translation(key, value, language):
    """Add a new translation"""
    translation = Translation(
        key=key,
        value=value,
        language=language
    )
    db.session.add(translation)
    db.session.commit()
    return translation

def update_translation(key, value, language):
    """Update an existing translation"""
    translation = Translation.query.filter_by(
        key=key,
        language=language
    ).first()
    
    if translation:
        translation.value = value
        db.session.commit()
        return translation
    return None

def delete_translation(key, language):
    """Delete a translation"""
    translation = Translation.query.filter_by(
        key=key,
        language=language
    ).first()
    
    if translation:
        db.session.delete(translation)
        db.session.commit()
        return True
    return False 
 