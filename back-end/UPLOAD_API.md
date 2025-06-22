# Upload API Documentation

## Overview
Upload API cho phép upload hình ảnh lên AWS S3 sử dụng form data và trả về URL của hình ảnh đã upload.

## Endpoints

### 1. Upload Image
**POST** `/api/upload/image/`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file` (required): File hình ảnh cần upload
- `folder` (optional): Thư mục trong S3 để lưu file (default: 'images')

**Allowed File Types:**
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

**File Size Limit:** 10MB

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "image_url": "https://tien-dai-phat-website.s3.ap-southeast-1.amazonaws.com/images/20240101_120000_uuid.png",
    "filename": "20240101_120000_uuid.png",
    "original_filename": "my_image.png",
    "file_size": 1024000,
    "folder": "images"
  }
}
```

### 2. Delete Image
**DELETE** `/api/upload/image/{filename}`

**Query Parameters:**
- `folder` (optional): Thư mục trong S3 chứa file (default: 'images')

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully",
  "data": {
    "deleted_url": "https://tien-dai-phat-website.s3.ap-southeast-1.amazonaws.com/images/20240101_120000_uuid.png",
    "filename": "20240101_120000_uuid.png"
  }
}
```

## Usage Examples

### Upload Image với cURL

#### Upload cơ bản:
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@/path/to/image.jpg"
```

#### Upload với folder tùy chỉnh:
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@/path/to/image.jpg" \
  -F "folder=news"
```

#### Upload với JavaScript/Fetch:
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('folder', 'products');

fetch('/api/upload/image/', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Uploaded image URL:', data.data.image_url);
});
```

#### Upload với Axios:
```javascript
import axios from 'axios';

const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'projects');

const response = await axios.post('/api/upload/image/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

console.log('Image URL:', response.data.data.image_url);
```

### Delete Image

#### Delete với cURL:
```bash
curl -X DELETE "http://localhost:5000/api/upload/image/20240101_120000_uuid.png?folder=news"
```

#### Delete với JavaScript:
```javascript
fetch('/api/upload/image/20240101_120000_uuid.png?folder=news', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => {
  console.log('Image deleted:', data.message);
});
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "No file provided"
}
```

```json
{
  "error": "No file selected"
}
```

```json
{
  "error": "File type not allowed. Allowed types: png, jpg, jpeg, gif, webp, svg"
}
```

```json
{
  "error": "File too large. Maximum size is 10MB"
}
```

### 500 Internal Server Error
```json
{
  "error": "Upload failed",
  "message": "Error details..."
}
```

## File Naming Convention

API tự động tạo tên file duy nhất theo format:
```
{timestamp}_{uuid}.{extension}
```

Ví dụ: `20240101_120000_550e8400-e29b-41d4-a716-446655440000.png`

## S3 Configuration

API sử dụng cấu hình S3 từ environment variables:

```python
AWS_ACCESS_KEY_ID = 'your-access-key'
AWS_SECRET_ACCESS_KEY = 'your-secret-key'
AWS_REGION = 'ap-southeast-1'
AWS_S3_BUCKET = 'tien-dai-phat-website'
AWS_S3_BUCKET_URL = 'https://tien-dai-phat-website.s3.ap-southeast-1.amazonaws.com'
```

## Security Features

1. **File Type Validation**: Chỉ cho phép các loại file hình ảnh
2. **File Size Limit**: Giới hạn 10MB per file
3. **Secure Filename**: Sử dụng `secure_filename()` để tránh path traversal
4. **Unique Naming**: Tạo tên file duy nhất để tránh conflict
5. **Content Type Detection**: Tự động detect content type

## Integration Examples

### Upload cho News
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@news_image.jpg" \
  -F "folder=news"
```

### Upload cho Products
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@product_image.jpg" \
  -F "folder=products"
```

### Upload cho Projects
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@project_image.jpg" \
  -F "folder=projects"
```

### Upload cho Certifications
```bash
curl -X POST http://localhost:5000/api/upload/image/ \
  -F "file=@certification_image.jpg" \
  -F "folder=certifications"
```

## Testing

Chạy test script để kiểm tra API:
```bash
cd back-end
python test_upload_simple.py
```

## Notes

- File được upload sẽ có public access
- URL trả về có thể truy cập trực tiếp từ browser
- Nên xóa file không sử dụng để tiết kiệm chi phí S3
- API tự động tạo folder nếu chưa tồn tại trong S3
- Tất cả file được lưu với content-type phù hợp
