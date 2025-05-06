from flask_restx import Api, fields, Namespace

# Create the API documentation
api = Api(
    title='Tien Dai Phat API',
    version='1.0',
    description='API documentation for Tien Dai Phat website',
    doc='/api/docs',
    prefix='/api'
)

# Create namespaces
content_ns = Namespace('contents', description='Content operations')
category_ns = Namespace('categories', description='Category operations')
tag_ns = Namespace('tags', description='Tag operations')
translation_ns = Namespace('translations', description='Translation operations')

# Content models
content_model = api.model('Content', {
    'id': fields.Integer(readonly=True, description='Content ID'),
    'title': fields.String(required=True, description='Content title'),
    'content': fields.String(required=True, description='Content body'),
    'status': fields.String(description='Content status (draft, published)'),
    'content_type': fields.String(required=True, description='Content type'),
    'featured_image': fields.String(description='Featured image URL'),
    'meta_description': fields.String(description='Meta description'),
    'meta_keywords': fields.String(description='Meta keywords'),
    'created_at': fields.DateTime(readonly=True, description='Creation date'),
    'updated_at': fields.DateTime(readonly=True, description='Last update date')
})

content_translation_model = api.model('ContentTranslation', {
    'language': fields.String(required=True, description='Language code'),
    'title': fields.String(required=True, description='Translated title'),
    'content': fields.String(required=True, description='Translated content'),
    'meta_description': fields.String(description='Translated meta description'),
    'meta_keywords': fields.String(description='Translated meta keywords')
})

# Category models
category_model = api.model('Category', {
    'id': fields.Integer(readonly=True, description='Category ID'),
    'name': fields.String(required=True, description='Category name'),
    'description': fields.String(description='Category description'),
    'parent_id': fields.Integer(description='Parent category ID'),
    'order': fields.Integer(description='Display order'),
    'created_at': fields.DateTime(readonly=True, description='Creation date'),
    'updated_at': fields.DateTime(readonly=True, description='Last update date')
})

category_translation_model = api.model('CategoryTranslation', {
    'language': fields.String(required=True, description='Language code'),
    'name': fields.String(required=True, description='Translated name'),
    'description': fields.String(description='Translated description')
})

# Tag models
tag_model = api.model('Tag', {
    'id': fields.Integer(readonly=True, description='Tag ID'),
    'name': fields.String(required=True, description='Tag name'),
    'created_at': fields.DateTime(readonly=True, description='Creation date'),
    'updated_at': fields.DateTime(readonly=True, description='Last update date')
})

tag_translation_model = api.model('TagTranslation', {
    'language': fields.String(required=True, description='Language code'),
    'name': fields.String(required=True, description='Translated name')
})

# Translation models
translation_model = api.model('Translation', {
    'id': fields.Integer(readonly=True, description='Translation ID'),
    'key': fields.String(required=True, description='Translation key'),
    'language': fields.String(required=True, description='Language code'),
    'value': fields.String(required=True, description='Translated value'),
    'created_at': fields.DateTime(readonly=True, description='Creation date'),
    'updated_at': fields.DateTime(readonly=True, description='Last update date')
}) 
 