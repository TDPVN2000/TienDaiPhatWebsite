import base64
import os
from datetime import datetime
from typing import Tuple, Optional, List
from flask import current_app
from .s3_handler import S3Handler
import re

class CKEditorHandler:
    @staticmethod
    def _ensure_upload_dir(upload_dir: str) -> str:
        """
        Ensure the upload directory exists and is writable

        Args:
            upload_dir (str): Directory to save uploaded images

        Returns:
            str: Full path to the upload directory
        """
        # In Docker, we'll use /tmp for file storage
        static_folder = '/tmp/static'
        current_app.static_folder = static_folder

        # Create static folder if it doesn't exist
        os.makedirs(static_folder, exist_ok=True)

        # Create the specific upload directory
        upload_path = os.path.join(static_folder, upload_dir)
        os.makedirs(upload_path, exist_ok=True)
        return upload_path

    @staticmethod
    def extract_image_urls(content: str) -> List[str]:
        """
        Extract all image URLs from content

        Args:
            content (str): The content to extract URLs from

        Returns:
            List[str]: List of image URLs found in content
        """
        if not content:
            return []

        # Find all image URLs in the content
        bucket_url = current_app.config['AWS_S3_BUCKET_URL']
        pattern = f"{bucket_url}/[^\"']+"
        return re.findall(pattern, content)

    @staticmethod
    def process_content(content: str, upload_dir: str = 'uploads') -> Tuple[str, list]:
        """
        Process CKEditor content to handle base64 images

        Args:
            content (str): The content from CKEditor
            upload_dir (str): Directory to save uploaded images

        Returns:
            Tuple[str, list]: Processed content and list of saved image paths
        """
        if not content:
            return content, []

        saved_images = []
        processed_content = content

        # Find all base64 images in the content
        base64_pattern = r'data:image/([^;]+);base64,([^"]+)'

        for match in re.finditer(base64_pattern, content):
            image_type = match.group(1)
            base64_data = match.group(2)

            # Generate unique filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{len(saved_images)}.{image_type}"

            try:
                # Decode base64 data
                image_data = base64.b64decode(base64_data)

                # Upload to S3
                image_url = S3Handler.upload_file(image_data, filename, upload_dir)

                # Update content with new image URL
                processed_content = processed_content.replace(
                    match.group(0),
                    image_url
                )
                saved_images.append(image_url)
            except Exception as e:
                current_app.logger.error(f"Error saving image: {str(e)}")
                continue

        return processed_content, saved_images

    @staticmethod
    def cleanup_old_images(content: str, old_content: str, upload_dir: str = 'uploads') -> None:
        """
        Clean up old images that are no longer used in the content

        Args:
            content (str): New content
            old_content (str): Old content
            upload_dir (str): Directory where images are stored
        """
        if not old_content:
            return

        # Extract image URLs from old content
        old_images = CKEditorHandler.extract_image_urls(old_content)
        new_images = CKEditorHandler.extract_image_urls(content)

        # Find images that are no longer used
        deleted_images = set(old_images) - set(new_images)

        # Delete unused images
        for image_url in deleted_images:
            try:
                S3Handler.delete_file(image_url)
                current_app.logger.info(f"Deleted unused image: {image_url}")
            except Exception as e:
                current_app.logger.error(f"Error deleting old image: {str(e)}")

    @staticmethod
    def update_content_images(content: str, old_content: str, upload_dir: str = 'uploads') -> Tuple[str, List[str]]:
        """
        Update content with new images and clean up old ones

        Args:
            content (str): New content
            old_content (str): Old content
            upload_dir (str): Directory to save uploaded images

        Returns:
            Tuple[str, List[str]]: Updated content and list of new image URLs
        """
        # Process new content
        processed_content, new_images = CKEditorHandler.process_content(content, upload_dir)

        # Clean up old images
        CKEditorHandler.cleanup_old_images(processed_content, old_content, upload_dir)

        return processed_content, new_images
