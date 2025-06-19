import boto3
from botocore.exceptions import ClientError
from flask import current_app
import base64
from typing import Tuple, Optional
from datetime import datetime

class S3Handler:
    @staticmethod
    def get_s3_client():
        """Get S3 client with credentials from config"""
        return boto3.client(
            's3',
            aws_access_key_id=current_app.config['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=current_app.config['AWS_SECRET_ACCESS_KEY'],
            region_name=current_app.config['AWS_REGION']
        )

    @staticmethod
    def upload_file(file_data: bytes, file_name: str, folder: str = 'uploads') -> str:
        """
        Upload a file to S3

        Args:
            file_data (bytes): The file data to upload
            file_name (str): The name of the file
            folder (str): The folder in S3 to upload to

        Returns:
            str: The URL of the uploaded file
        """
        try:
            s3_client = S3Handler.get_s3_client()
            bucket = current_app.config['AWS_S3_BUCKET']
            bucket_url = current_app.config['AWS_S3_BUCKET_URL']

            # Generate S3 key
            s3_key = f"{folder}/{file_name}"

            # Upload file
            s3_client.put_object(
                Bucket=bucket,
                Key=s3_key,
                Body=file_data,
                ContentType=f"image/{file_name.split('.')[-1]}"
            )

            # Return the URL
            return f"{bucket_url}/{s3_key}"

        except ClientError as e:
            current_app.logger.error(f"Error uploading file to S3: {str(e)}")
            raise

    @staticmethod
    def delete_file(file_url: str) -> bool:
        """
        Delete a file from S3

        Args:
            file_url (str): The URL of the file to delete

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            s3_client = S3Handler.get_s3_client()
            bucket = current_app.config['AWS_S3_BUCKET']
            bucket_url = current_app.config['AWS_S3_BUCKET_URL']

            # Extract the key from the URL
            key = file_url.replace(f"{bucket_url}/", "")

            # Delete the file
            s3_client.delete_object(
                Bucket=bucket,
                Key=key
            )

            return True

        except ClientError as e:
            current_app.logger.error(f"Error deleting file from S3: {str(e)}")
            return False
