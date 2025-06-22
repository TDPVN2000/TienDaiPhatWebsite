from flask import Blueprint, request, current_app
from flask_restx import Resource
from werkzeug.utils import secure_filename
import os
import uuid
from datetime import datetime
from ..utils.s3_handler import S3Handler
from ..docs.api import upload_ns, upload_response_model
from . import BaseController

bp = Blueprint('upload', __name__, url_prefix='/api/upload')

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(original_filename):
    """Generate a unique filename to avoid conflicts"""
    # Get file extension
    file_extension = original_filename.rsplit('.', 1)[1].lower()

    # Generate unique ID
    unique_id = str(uuid.uuid4())

    # Get current timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Create new filename
    new_filename = f"{timestamp}_{unique_id}.{file_extension}"

    return new_filename

@upload_ns.route('/image/')
class ImageUpload(BaseController):
    @upload_ns.doc('upload_image')
    @upload_ns.response(200, 'Image uploaded successfully', upload_response_model)
    @upload_ns.response(400, 'Invalid file or no file provided')
    @upload_ns.response(500, 'Upload failed')
    def post(self):
        """Upload an image to S3 using form data"""
        try:
            # Check if file is present in request
            if 'file' not in request.files:
                return {'error': 'No file provided'}, 400

            file = request.files['file']

            # Check if file is selected
            if file.filename == '':
                return {'error': 'No file selected'}, 400

            # Check if file is allowed
            if not allowed_file(file.filename):
                return {
                    'error': 'File type not allowed. Allowed types: ' + ', '.join(ALLOWED_EXTENSIONS)
                }, 400

            # Check file size (max 10MB)
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)  # Reset file pointer

            max_size = 10 * 1024 * 1024  # 10MB
            if file_size > max_size:
                return {'error': 'File too large. Maximum size is 10MB'}, 400

            # Generate unique filename
            original_filename = secure_filename(file.filename)
            unique_filename = generate_unique_filename(original_filename)

            # Get folder from request (optional)
            folder = request.form.get('folder', 'images')

            # Read file data
            file_data = file.read()

            # Upload to S3
            image_url = S3Handler.upload_file(
                file_data=file_data,
                file_name=unique_filename,
                folder=folder
            )

            # Return success response
            return {
                'success': True,
                'message': 'Image uploaded successfully',
                'data': {
                    'image_url': image_url,
                    'filename': unique_filename,
                    'original_filename': original_filename,
                    'file_size': file_size,
                    'folder': folder
                }
            }, 200

        except Exception as e:
            current_app.logger.error(f"Error uploading image: {str(e)}")
            return {'error': 'Upload failed', 'message': str(e)}, 500

@upload_ns.route('/image/<filename>')
@upload_ns.param('filename', 'The filename to delete')
class ImageDelete(BaseController):
    @upload_ns.doc('delete_image')
    @upload_ns.response(200, 'Image deleted successfully')
    @upload_ns.response(404, 'Image not found')
    @upload_ns.response(500, 'Delete failed')
    def delete(self, filename):
        """Delete an image from S3"""
        try:
            # Get folder from request (optional)
            folder = request.args.get('folder', 'images')

            # Construct the file URL
            bucket_url = current_app.config['AWS_S3_BUCKET_URL']
            file_url = f"{bucket_url}/{folder}/{filename}"

            # Delete from S3
            success = S3Handler.delete_file(file_url)

            if success:
                return {
                    'success': True,
                    'message': 'Image deleted successfully',
                    'data': {
                        'deleted_url': file_url,
                        'filename': filename
                    }
                }, 200
            else:
                return {'error': 'Failed to delete image'}, 500

        except Exception as e:
            current_app.logger.error(f"Error deleting image: {str(e)}")
            return {'error': 'Delete failed', 'message': str(e)}, 500
