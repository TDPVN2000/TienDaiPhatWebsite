from flask_restx import Api, Namespace, Resource, fields
from .product import product_ns, product_model
from .new import news_ns, news_model
from ..constants import MODEL_NAME_ENUM, LANGUAGE_CODE_ENUM

# Create API instance
api = Api(
    title='TienDaiPhat API',
    version='1.0',
    description='API documentation for TienDaiPhat website',
    doc='/api/docs',
    prefix='/api'
)

# Create namespaces for each controller
capability_ns = Namespace('capabilities', description='Capability operations')
table_data_ns = Namespace('table-data', description='Table data operations')
certification_ns = Namespace('certifications', description='Certification operations')
project_ns = Namespace('projects', description='Project operations')
investment_ns = Namespace('investments', description='Investment operations')
introduction_ns = Namespace('introductions', description='Introduction operations')
field_ns = Namespace('fields', description='Field operations')
recruitment_ns = Namespace('recruitment', description='Recruitment operations')

# Upload API
upload_ns = api.namespace('upload', description='File upload operations')

# Upload response model
upload_response_model = upload_ns.model('UploadResponse', {
    'success': fields.Boolean(description='Upload success status'),
    'message': fields.String(description='Response message'),
    'data': fields.Nested(upload_ns.model('UploadData', {
        'image_url': fields.String(description='URL of uploaded image'),
        'filename': fields.String(description='Generated filename'),
        'original_filename': fields.String(description='Original filename'),
        'file_size': fields.Integer(description='File size in bytes'),
        'folder': fields.String(description='S3 folder path')
    }))
})

# Translation API
translation_ns = api.namespace('translations', description='Translation operations')

translation_model = translation_ns.model('Translation', {
    'id': fields.Integer(readonly=True),
    'key': fields.String(required=True, description='Translation key'),
    'language': fields.String(required=True, description='Language code (e.g., en, vi)', enum=LANGUAGE_CODE_ENUM),
    'value': fields.String(required=True, description='Translated value'),
    'model_name': fields.String(required=True, description='Name of the model this translation belongs to', enum=MODEL_NAME_ENUM),
    'created_at': fields.DateTime(readonly=True),
    'updated_at': fields.DateTime(readonly=True)
})

# Create translation input model for POST requests
translation_input_model = translation_ns.model('TranslationInput', {
    'key': fields.String(required=True, description='Translation key'),
    'language': fields.String(required=True, description='Language code (e.g., en, vi)', enum=LANGUAGE_CODE_ENUM),
    'value': fields.String(required=True, description='Translated value'),
    'model_name': fields.String(required=True, description='Name of the model this translation belongs to', enum=MODEL_NAME_ENUM)
})

# News API
news_ns = api.namespace('news', description='News operations')

news_model = news_ns.model('News', {
    'id': fields.Integer(readonly=True),
    'title': fields.String(required=True, description='News title'),
    'description': fields.String(description='News description'),
    'content': fields.String(required=True, description='News content'),
    'image_url': fields.String(description='News image URL'),
    'created_at': fields.DateTime(readonly=True),
    'updated_at': fields.DateTime(readonly=True)
})

# Common response models
error_model = api.model('Error', {
    'message': fields.String(description='Error message')
})

# Capability models
capability_model = api.model('Capability', {
    'id': fields.Integer(description='Capability ID'),
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Capability name'),
    'description': fields.String(description='Capability description'),
    'image_url': fields.String(description='Capability image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

capability_input_model = api.model('CapabilityInput', {
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(required=True, description='Capability name'),
    'description': fields.String(description='Capability description'),
    'image_url': fields.String(description='Capability image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name", "description": "English Description"}, "vi": {"name": "Tên tiếng Việt", "description": "Mô tả tiếng Việt"}}')
})

# Table Data models
table_data_model = api.model('TableData', {
    'id': fields.Integer(description='Table Data ID'),
    'name': fields.String(description='Table Data name'),
    'data': fields.Raw(description='Table Data content'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

table_data_input_model = api.model('TableDataInput', {
    'name': fields.String(required=True, description='Table Data name'),
    'data': fields.Raw(description='Table Data content'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name"}, "vi": {"name": "Tên tiếng Việt"}}')
})

# Certification models
certification_model = api.model('Certification', {
    'id': fields.Integer(description='Certification ID'),
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Certification name'),
    'description': fields.String(description='Certification description'),
    'image_url': fields.String(description='Certification image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

certification_input_model = api.model('CertificationInput', {
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(required=True, description='Certification name'),
    'description': fields.String(description='Certification description'),
    'image_url': fields.String(description='Certification image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name", "description": "English Description"}, "vi": {"name": "Tên tiếng Việt", "description": "Mô tả tiếng Việt"}}')
})

# Project models
project_model = api.model('Project', {
    'id': fields.Integer(description='Project ID'),
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Project name'),
    'description': fields.String(description='Project description'),
    'image_url': fields.String(description='Project image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

project_input_model = api.model('ProjectInput', {
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(required=True, description='Project name'),
    'description': fields.String(description='Project description'),
    'image_url': fields.String(description='Project image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name", "description": "English Description"}, "vi": {"name": "Tên tiếng Việt", "description": "Mô tả tiếng Việt"}}')
})

# Investment models
investment_model = api.model('Investment', {
    'id': fields.Integer(description='Investment ID'),
    'field_id': fields.Integer(description='Field ID'),
    'title': fields.String(description='Investment title'),
    'description': fields.String(description='Investment description'),
    'value': fields.String(description='Investment value'),
    'unit': fields.String(description='Investment unit'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

investment_input_model = api.model('InvestmentInput', {
    'field_id': fields.Integer(description='Field ID'),
    'title': fields.String(required=True, description='Investment title'),
    'description': fields.String(description='Investment description'),
    'value': fields.String(description='Investment value'),
    'unit': fields.String(description='Investment unit'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"title": "English Title", "description": "English Description", "value": "English Value", "unit": "English Unit"}, "vi": {"title": "Tiêu đề tiếng Việt", "description": "Mô tả tiếng Việt", "value": "Giá trị tiếng Việt", "unit": "Đơn vị tiếng Việt"}}')
})

# Introduction models
introduction_model = api.model('Introduction', {
    'id': fields.Integer(description='Introduction ID'),
    'title': fields.String(description='Introduction title'),
    'content': fields.String(description='Introduction content'),
    'image_url': fields.String(description='Introduction image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

introduction_input_model = api.model('IntroductionInput', {
    'title': fields.String(required=True, description='Introduction title'),
    'content': fields.String(description='Introduction content'),
    'image_url': fields.String(description='Introduction image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"title": "English Title", "content": "English Content"}, "vi": {"title": "Tiêu đề tiếng Việt", "content": "Nội dung tiếng Việt"}}')
})

# Field models
field_model = api.model('Field', {
    'id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Field name'),
    'description': fields.String(description='Field description'),
    'image_url': fields.String(description='Field image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp'),
    'investments': fields.List(fields.Nested(investment_model), description='Related investments'),
    'certifications': fields.List(fields.Nested(certification_model), description='Related certifications'),
    'projects': fields.List(fields.Nested(project_model), description='Related projects'),
    'table_data': fields.List(fields.Nested(table_data_model), description='Related table data'),
    'introductions': fields.List(fields.Nested(introduction_model), description='Related introductions'),
    'capabilities': fields.List(fields.Nested(capability_model), description='Related capabilities'),
    'products': fields.List(fields.Nested(product_model), description='Related products')
})

field_input_model = api.model('FieldInput', {
    'name': fields.String(required=True, description='Field name'),
    'description': fields.String(description='Field description'),
    'image_url': fields.String(description='Field image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name", "description": "English Description"}, "vi": {"name": "Tên tiếng Việt", "description": "Mô tả tiếng Việt"}}')
})

# Product models
product_model = api.model('Product', {
    'id': fields.Integer(description='Product ID'),
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(description='Product name'),
    'description': fields.String(description='Product description'),
    'features': fields.String(description='Product features'),
    'image_url': fields.String(description='Product image URL'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

product_input_model = api.model('ProductInput', {
    'field_id': fields.Integer(description='Field ID'),
    'name': fields.String(required=True, description='Product name'),
    'description': fields.String(description='Product description'),
    'features': fields.String(description='Product features'),
    'image_url': fields.String(description='Product image URL'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"name": "English Name", "description": "English Description", "features": "English Features"}, "vi": {"name": "Tên tiếng Việt", "description": "Mô tả tiếng Việt", "features": "Tính năng tiếng Việt"}}')
})

# Recruitment models
recruitment_model = api.model('Recruitment', {
    'id': fields.Integer(description='Recruitment ID'),
    'position': fields.String(description='Position title'),
    'des_position': fields.String(description='Position description'),
    'address': fields.String(description='Work address'),
    'status': fields.String(description='Position status'),
    'created_at': fields.DateTime(description='Creation timestamp'),
    'updated_at': fields.DateTime(description='Last update timestamp')
})

recruitment_input_model = api.model('RecruitmentInput', {
    'position': fields.String(required=True, description='Position title'),
    'des_position': fields.String(description='Position description'),
    'address': fields.String(required=True, description='Work address'),
    'status': fields.String(description='Position status'),
    'translations': fields.Raw(description='Translations object with language codes as keys and translation objects as values. Example: {"en": {"position": "English Position", "des_position": "English Description", "address": "English Address"}, "vi": {"position": "Vị trí tiếng Việt", "des_position": "Mô tả tiếng Việt", "address": "Địa chỉ tiếng Việt"}}')
})

recruitment_list_model = api.model('RecruitmentList', {
    'recruitments': fields.List(fields.Nested(recruitment_model))
})

# Add namespaces to API
api.add_namespace(capability_ns)
api.add_namespace(table_data_ns)
api.add_namespace(certification_ns)
api.add_namespace(project_ns)
api.add_namespace(investment_ns)
api.add_namespace(product_ns)
api.add_namespace(introduction_ns)
api.add_namespace(field_ns)
api.add_namespace(news_ns)
api.add_namespace(recruitment_ns)
api.add_namespace(translation_ns)
api.add_namespace(upload_ns)
