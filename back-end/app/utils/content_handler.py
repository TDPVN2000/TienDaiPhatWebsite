from flask import current_app, url_for
from typing import Dict, Any
import re

class ContentHandler:
    @staticmethod
    def process_content_for_display(content: str, content_type: str) -> str:
        """
        Process content to update image URLs for display
        
        Args:
            content (str): The content to process
            content_type (str): Type of content (news, introductions, etc.)
            
        Returns:
            str: Processed content with updated image URLs
        """
        if not content:
            return content

        # Process CKEditor image URLs
        ckeditor_pattern = r'/static/([^"\']+)'
        def replace_ckeditor_url(match):
            image_path = match.group(1)
            return f"{current_app.config.get('BASE_URL', '')}/static/{image_path}"

        # Process HTML image tags
        html_pattern = r'<img[^>]+src="([^"]+)"'
        def replace_html_url(match):
            image_url = match.group(1)
            if image_url.startswith('/static/'):
                return f'<img src="{current_app.config.get("BASE_URL", "")}{image_url}"'
            return match.group(0)

        # Apply replacements
        content = re.sub(ckeditor_pattern, replace_ckeditor_url, content)
        content = re.sub(html_pattern, replace_html_url, content)

        return content

    @staticmethod
    def process_model_for_display(model_data: Dict[str, Any], content_type: str) -> Dict[str, Any]:
        """
        Process model data to update image URLs for display
        
        Args:
            model_data (Dict[str, Any]): The model data to process
            content_type (str): Type of content (news, introductions, etc.)
            
        Returns:
            Dict[str, Any]: Processed model data with updated image URLs
        """
        if not model_data:
            return model_data

        # Process content field if it exists
        if 'content' in model_data:
            model_data['content'] = ContentHandler.process_content_for_display(
                model_data['content'],
                content_type
            )

        # Process description field if it exists
        if 'description' in model_data:
            model_data['description'] = ContentHandler.process_content_for_display(
                model_data['description'],
                content_type
            )

        # Process image_url field if it exists
        if 'image_url' in model_data and model_data['image_url']:
            if model_data['image_url'].startswith('/static/'):
                model_data['image_url'] = f"{current_app.config.get('BASE_URL', '')}{model_data['image_url']}"

        return model_data 
