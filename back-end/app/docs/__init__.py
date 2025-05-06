from .api import api
from .auth import (
    auth_ns, auth_model, login_model, token_model,
    success_response, error_response
)
from .content import (
    content_ns, content_model, content_list_model,
    content_query_params, content_input_model, content_translation_model
)
from .category import (
    category_ns, category_model, category_list_model,
    category_query_params, category_input_model, category_translation_model
)
from .tag import (
    tag_ns, tag_model, tag_list_model,
    tag_query_params, tag_input_model, tag_translation_model
)
from .translation import (
    translation_ns, translation_model, translation_list_model,
    translation_query_params, translation_input_model
)

# Add namespaces
api.add_namespace(auth_ns, path='/api/auth')
api.add_namespace(content_ns, path='/api/contents')
api.add_namespace(category_ns, path='/api/categories')
api.add_namespace(tag_ns, path='/api/tags')
api.add_namespace(translation_ns, path='/api/translations')

# Export all models and namespaces
__all__ = [
    # API
    'api',
    
    # Auth
    'auth_ns', 'auth_model', 'login_model', 'token_model',
    'success_response', 'error_response',
    
    # Content
    'content_ns', 'content_model', 'content_list_model',
    'content_query_params', 'content_input_model', 'content_translation_model',
    
    # Category
    'category_ns', 'category_model', 'category_list_model',
    'category_query_params', 'category_input_model', 'category_translation_model',
    
    # Tag
    'tag_ns', 'tag_model', 'tag_list_model',
    'tag_query_params', 'tag_input_model', 'tag_translation_model',
    
    # Translation
    'translation_ns', 'translation_model', 'translation_list_model',
    'translation_query_params', 'translation_input_model'
] 
