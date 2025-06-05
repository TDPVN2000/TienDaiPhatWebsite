from app.models.product import Product
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler

class ProductService:
    @staticmethod
    def get_all():
        products = Product.query.all()
        return [ContentHandler.process_model_for_display(product.to_dict(), 'products') for product in products]

    @staticmethod
    def get_by_id(product_id):
        product = Product.query.get(product_id)
        if not product:
            return None
        return ContentHandler.process_model_for_display(product.to_dict(), 'products')

    @staticmethod
    def create(data):
        # Process CKEditor content
        if 'description' in data:
            description = data['description']
            processed_description, _ = CKEditorHandler.process_content(description, 'products')
            data['description'] = processed_description

        product = Product(**data)
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def update(product_id, data):
        product = Product.query.get(product_id)
        if not product:
            return None

        # Process CKEditor content if present
        if 'description' in data:
            old_description = product.description
            processed_description, _ = CKEditorHandler.process_content(data['description'], 'products')
            data['description'] = processed_description
            CKEditorHandler.cleanup_old_images(processed_description, old_description, 'products')

        for key, value in data.items():
            setattr(product, key, value)
        db.session.commit()
        return product

    @staticmethod
    def delete(product_id):
        product = Product.query.get(product_id)
        if not product:
            return False

        # Clean up images in description
        if product.description:
            CKEditorHandler.cleanup_old_images('', product.description, 'products')

        db.session.delete(product)
        db.session.commit()
        return True 
