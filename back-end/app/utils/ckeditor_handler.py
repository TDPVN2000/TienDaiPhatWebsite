import base64
import os
from datetime import datetime
from typing import Tuple, Optional
from flask import current_app

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
            
        # Ensure upload directory exists
        upload_path = CKEditorHandler._ensure_upload_dir(upload_dir)
        
        saved_images = []
        processed_content = content
        
        # Find all base64 images in the content
        import re
        base64_pattern = r'data:image/([^;]+);base64,([^"]+)'
        
        for match in re.finditer(base64_pattern, content):
            image_type = match.group(1)
            base64_data = match.group(2)
            
            # Generate unique filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{len(saved_images)}.{image_type}"
            filepath = os.path.join(upload_path, filename)
            
            # Save the image
            try:
                image_data = base64.b64decode(base64_data)
                with open(filepath, 'wb') as f:
                    f.write(image_data)
                
                # Update content with new image URL
                relative_path = os.path.join(upload_dir, filename)
                processed_content = processed_content.replace(
                    match.group(0),
                    f"/static/{relative_path}"
                )
                saved_images.append(relative_path)
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
        import re
        old_images = re.findall(r'/static/' + upload_dir + r'/[^"\']+', old_content)
        
        # Check which images are no longer used
        for image_path in old_images:
            if image_path not in content:
                full_path = os.path.join(current_app.static_folder, image_path.replace('/static/', ''))
                try:
                    if os.path.exists(full_path):
                        os.remove(full_path)
                except Exception as e:
                    current_app.logger.error(f"Error deleting old image: {str(e)}") 
