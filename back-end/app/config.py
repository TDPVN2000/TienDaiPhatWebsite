import os
from datetime import timedelta

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    BASE_URL = os.environ.get('BASE_URL') or 'http://localhost:5000'

    # AWS S3 settings
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_REGION = os.environ.get('AWS_REGION', 'ap-southeast-1')
    AWS_S3_BUCKET = os.environ.get('AWS_S3_BUCKET')
    AWS_S3_BUCKET_URL = os.environ.get('AWS_S3_BUCKET_URL')  # e.g., https://your-bucket.s3.amazonaws.com

    # CORS settings
    CORS_ORIGINS = [
        'http://localhost:3000',
        'https://*.ngrok-free.app',
        'http://localhost:5000',
        'http://localhost:*',
        'https://localhost:*',
        'http://127.0.0.1:*',
        'https://127.0.0.1:*',
        'https://nimble-pegasus-974ceb.netlify.app',
        'https://*.netlify.app',
        'https://*.trycloudflare.com',
        'https://dog-remain-manor-celebration.trycloudflare.com',
        '*'  # Allow all origins in development
    ]
    CORS_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
    CORS_ALLOW_HEADERS = [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'ngrok-skip-browser-warning',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods'
    ]
    CORS_EXPOSE_HEADERS = ['Content-Type', 'Authorization']
    CORS_SUPPORTS_CREDENTIALS = True
    CORS_MAX_AGE = 600  # Cache preflight requests for 10 minutes

    # Database settings
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:postgres@db:5432/tiendaiphat'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # Redis settings
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://redis:6379/0'

    # Mail settings
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')

    # Babel settings
    LANGUAGES = ['en', 'vi']
    BABEL_DEFAULT_LOCALE = 'en'

    # Upload settings
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

    # Cache settings
    CACHE_TYPE = 'redis'
    CACHE_REDIS_URL = REDIS_URL
    CACHE_DEFAULT_TIMEOUT = 300

    # Rate limiting
    RATELIMIT_DEFAULT = "200 per day"
    RATELIMIT_STORAGE_URL = REDIS_URL
