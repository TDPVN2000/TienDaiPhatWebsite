from app.models.product import Product
from app.extensions import db
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from .translation_service import TranslationService
from typing import List, Optional

class ProductService:
    @staticmethod
    def get_all(language: Optional[str] = None):
        products = Product.query.all()
        result = []

        for product in products:
            product_dict = product.to_dict()
            if language:
                # Translate name, description and features
                product_dict = TranslationService.translate_object(
                    product_dict,
                    language,
                    ['name', 'description', 'features'],
                    'product'
                )
            # Process content for display
            product_dict = ContentHandler.process_model_for_display(product_dict, 'products')
            result.append(product_dict)

        return result

    @staticmethod
    def get_by_id(product_id, language: Optional[str] = None):
        product = Product.query.get(product_id)
        if not product:
            return None

        product_dict = product.to_dict()
        if language:
            # Translate name, description and features
            product_dict = TranslationService.translate_object(
                product_dict,
                language,
                ['name', 'description', 'features'],
                'product'
            )
        # Process content for display
        product_dict = ContentHandler.process_model_for_display(product_dict, 'products')
        return product_dict

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

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.create_translation(
                        f"{product.id}_name",
                        lang,
                        trans['name'],
                        'product'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    trans_description = trans['description']
                    processed_trans_description, _ = CKEditorHandler.process_content(trans_description, 'products')
                    TranslationService.create_translation(
                        f"{product.id}_description",
                        lang,
                        processed_trans_description,
                        'product'
                    )
                if 'features' in trans:
                    # Process CKEditor content in translations
                    trans_features = trans['features']
                    processed_trans_features, _ = CKEditorHandler.process_content(trans_features, 'products')
                    TranslationService.create_translation(
                        f"{product.id}_features",
                        lang,
                        processed_trans_features,
                        'product'
                    )

        return product

    @staticmethod
    def update(product_id, data):
        product = Product.query.get(product_id)
        if not product:
            return None

        # Process CKEditor content if present
        if 'description' in data:
            product.description, _ = CKEditorHandler.update_content_images(
                data['description'],
                product.description,
                'products'
            )

        # Update basic fields
        for key, value in data.items():
            if key != 'translations':
                setattr(product, key, value)

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'name' in trans:
                    TranslationService.update_translation(
                        f"{product.id}_name",
                        lang,
                        trans['name'],
                        'product'
                    )
                if 'description' in trans:
                    # Process CKEditor content in translations
                    old_trans_description = TranslationService.get_translation(f"{product.id}_description", lang, 'product')
                    processed_trans_description, _ = CKEditorHandler.update_content_images(
                        trans['description'],
                        old_trans_description,
                        'products'
                    )
                    TranslationService.update_translation(
                        f"{product.id}_description",
                        lang,
                        processed_trans_description,
                        'product'
                    )

        db.session.commit()
        return product

    @staticmethod
    def delete(product_id):
        product = Product.query.get(product_id)
        if not product:
            return False

        # Clean up images in description and features
        if product.description:
            CKEditorHandler.cleanup_old_images('', product.description, 'products')
        if product.features:
            CKEditorHandler.cleanup_old_images('', product.features, 'products')

        # Delete all translations for this product
        for lang in TranslationService.get_all_languages():
            trans_description = TranslationService.get_translation(f"{product.id}_description", lang, 'product')
            if trans_description:
                CKEditorHandler.cleanup_old_images('', trans_description, 'products')
            trans_features = TranslationService.get_translation(f"{product.id}_features", lang, 'product')
            if trans_features:
                CKEditorHandler.cleanup_old_images('', trans_features, 'products')
            TranslationService.delete_translation(f"{product.id}_name", lang, 'product')
            TranslationService.delete_translation(f"{product.id}_description", lang, 'product')
            TranslationService.delete_translation(f"{product.id}_features", lang, 'product')

        db.session.delete(product)
        db.session.commit()
        return True
