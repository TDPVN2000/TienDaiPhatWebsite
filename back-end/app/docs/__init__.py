from .api import api

from .field import field_ns, field_model, field_input_model, field_list_model
from .introduction import introduction_ns, introduction_model, introduction_input_model, introduction_list_model
from .product import product_ns, product_model, product_input_model, product_list_model
from .investment import investment_ns, investment_model, investment_input_model, investment_list_model
from .project import project_ns, project_model, project_input_model, project_list_model
from .certification import certification_ns, certification_model, certification_input_model, certification_list_model
from .table_data import table_data_ns, table_data_model, table_data_input_model, table_data_list_model
from .capability import capability_ns, capability_model, capability_input_model, capability_list_model

# Add namespaces
api.add_namespace(field_ns, path='/api/fields')
api.add_namespace(introduction_ns, path='/api/introductions')
api.add_namespace(product_ns, path='/api/products')
api.add_namespace(investment_ns, path='/api/investments')
api.add_namespace(project_ns, path='/api/projects')
api.add_namespace(certification_ns, path='/api/certifications')
api.add_namespace(table_data_ns, path='/api/table-data')
api.add_namespace(capability_ns, path='/api/capabilities')

# Export all models and namespaces
__all__ = [
    # API
    'api',
    
    # Field
    'field_ns', 'field_model', 'field_input_model', 'field_list_model',
    # Introduction
    'introduction_ns', 'introduction_model', 'introduction_input_model', 'introduction_list_model',
    # Product
    'product_ns', 'product_model', 'product_input_model', 'product_list_model',
    # Investment
    'investment_ns', 'investment_model', 'investment_input_model', 'investment_list_model',
    # Project
    'project_ns', 'project_model', 'project_input_model', 'project_list_model',
    # Certification
    'certification_ns', 'certification_model', 'certification_input_model', 'certification_list_model',
    # TableData
    'table_data_ns', 'table_data_model', 'table_data_input_model', 'table_data_list_model',
    # Capability
    'capability_ns', 'capability_model', 'capability_input_model', 'capability_list_model'
] 
