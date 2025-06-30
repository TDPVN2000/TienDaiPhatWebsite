from ..models import Recruitment
from ..extensions import db
from .translation_service import TranslationService
from .ckeditor_handler import CKEditorHandler
from .content_handler import ContentHandler
from typing import List, Optional

class RecruitmentService:
    @staticmethod
    def get_all(language: Optional[str] = None) -> List[dict]:
        """Get all recruitment positions with optional language translation"""
        recruitments = Recruitment.query.all()
        result = []

        for recruitment in recruitments:
            recruitment_dict = recruitment.to_dict()
            if language:
                # Translate position, des_position, and address
                recruitment_dict = TranslationService.translate_object(
                    recruitment_dict,
                    language,
                    ['position', 'des_position', 'address'],
                    'recruitment'
                )
            # Process content for display
            recruitment_dict = ContentHandler.process_model_for_display(recruitment_dict, 'recruitments')
            result.append(recruitment_dict)

        return result

    @staticmethod
    def get_by_id(recruitment_id: int, language: Optional[str] = None) -> Optional[dict]:
        """Get a recruitment position by ID with optional language translation"""
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return None

        recruitment_dict = recruitment.to_dict()
        if language:
            # Translate position, des_position, and address
            recruitment_dict = TranslationService.translate_object(
                recruitment_dict,
                language,
                ['position', 'des_position', 'address'],
                'recruitment'
            )
        # Process content for display
        recruitment_dict = ContentHandler.process_model_for_display(recruitment_dict, 'recruitments')
        return recruitment_dict

    @staticmethod
    def create(data: dict) -> Recruitment:
        """Create a new recruitment position with translations"""
        # Process CKEditor content for des_position
        des_position = data.get('des_position', '')
        processed_des_position, _ = CKEditorHandler.process_content(des_position, 'recruitment')

        recruitment = Recruitment(
            position=data['position'],
            des_position=processed_des_position,
            address=data['address'],
            status=data.get('status', 'active')
        )
        db.session.add(recruitment)
        db.session.commit()

        # Create translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'position' in trans:
                    TranslationService.create_translation(
                        f"{recruitment.id}_position",
                        lang,
                        trans['position'],
                        'recruitment'
                    )
                if 'des_position' in trans:
                    # Process CKEditor content in translations
                    trans_des_position = trans['des_position']
                    processed_trans_des_position, _ = CKEditorHandler.process_content(trans_des_position, 'recruitment')
                    TranslationService.create_translation(
                        f"{recruitment.id}_des_position",
                        lang,
                        processed_trans_des_position,
                        'recruitment'
                    )
                if 'address' in trans:
                    TranslationService.create_translation(
                        f"{recruitment.id}_address",
                        lang,
                        trans['address'],
                        'recruitment'
                    )

        return recruitment

    @staticmethod
    def update(recruitment_id: int, data: dict) -> Optional[Recruitment]:
        """Update a recruitment position and its translations"""
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return None

        if 'position' in data:
            recruitment.position = data['position']
        if 'des_position' in data:
            # Process CKEditor content and clean up old images
            recruitment.des_position, _ = CKEditorHandler.update_content_images(
                data['des_position'],
                recruitment.des_position,
                'recruitment'
            )
        if 'address' in data:
            recruitment.address = data['address']
        if 'status' in data:
            recruitment.status = data['status']

        # Update translations if provided
        if 'translations' in data:
            for lang, trans in data['translations'].items():
                if 'position' in trans:
                    TranslationService.update_translation(
                        f"{recruitment.id}_position",
                        lang,
                        trans['position'],
                        'recruitment'
                    )
                if 'des_position' in trans:
                    # Process CKEditor content in translations
                    old_trans_des_position = TranslationService.get_translation(f"{recruitment.id}_des_position", lang, 'recruitment')
                    processed_trans_des_position, _ = CKEditorHandler.update_content_images(
                        trans['des_position'],
                        old_trans_des_position,
                        'recruitment'
                    )
                    TranslationService.update_translation(
                        f"{recruitment.id}_des_position",
                        lang,
                        processed_trans_des_position,
                        'recruitment'
                    )
                if 'address' in trans:
                    TranslationService.update_translation(
                        f"{recruitment.id}_address",
                        lang,
                        trans['address'],
                        'recruitment'
                    )

        db.session.commit()
        return recruitment

    @staticmethod
    def delete(recruitment_id: int) -> bool:
        """Delete a recruitment position and its translations"""
        recruitment = Recruitment.query.get(recruitment_id)
        if not recruitment:
            return False

        # Clean up all images in the des_position
        CKEditorHandler.cleanup_old_images('', recruitment.des_position, 'recruitment')

        # Delete all translations for this recruitment position
        for lang in TranslationService.get_all_languages():
            trans_des_position = TranslationService.get_translation(f"{recruitment.id}_des_position", lang, 'recruitment')
            if trans_des_position:
                CKEditorHandler.cleanup_old_images('', trans_des_position, 'recruitment')
            TranslationService.delete_translation(f"{recruitment.id}_position", lang, 'recruitment')
            TranslationService.delete_translation(f"{recruitment.id}_des_position", lang, 'recruitment')
            TranslationService.delete_translation(f"{recruitment.id}_address", lang, 'recruitment')

        db.session.delete(recruitment)
        db.session.commit()
        return True
