# News API Documentation

## Overview
News API cho phép quản lý các tin tức của website TienDaiPhat với hỗ trợ đa ngôn ngữ.

## Endpoints

### 1. Lấy danh sách tất cả tin tức
**GET** `/api/news/`

**Query Parameters:**
- `language` (optional): Mã ngôn ngữ để dịch nội dung (en, vi)

**Response:**
```json
[
  {
    "id": 1,
    "title": "Tin tức mới",
    "description": "Mô tả tin tức",
    "content": "Nội dung chi tiết của tin tức",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
]
```

**Example với translation:**
```
GET /api/news/?language=en
```

### 2. Lấy tin tức theo ID
**GET** `/api/news/{news_id}`

**Query Parameters:**
- `language` (optional): Mã ngôn ngữ để dịch nội dung (en, vi)

**Response:**
```json
{
  "id": 1,
  "title": "Tin tức mới",
  "description": "Mô tả tin tức",
  "content": "Nội dung chi tiết của tin tức",
  "image_url": "https://example.com/image.jpg",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

### 3. Tạo tin tức mới
**POST** `/api/news/`

**Request Body:**
```json
{
  "title": "Tiêu đề tin tức",
  "description": "Mô tả ngắn gọn về tin tức",
  "content": "Nội dung chi tiết của tin tức",
  "image_url": "https://example.com/image.jpg",
  "translations": {
    "en": {
      "title": "News Title",
      "description": "News Description",
      "content": "News Content"
    },
    "vi": {
      "title": "Tiêu đề tin tức",
      "description": "Mô tả tin tức",
      "content": "Nội dung tin tức"
    }
  }
}
```

### 4. Cập nhật tin tức
**PUT** `/api/news/{news_id}`

**Request Body:** (tương tự như POST)

### 5. Xóa tin tức
**DELETE** `/api/news/{news_id}`

## Field Description

### Các trường bắt buộc:
- `title`: Tiêu đề tin tức
- `content`: Nội dung chi tiết của tin tức

### Các trường tùy chọn:
- `description`: Mô tả ngắn gọn về tin tức
- `image_url`: URL hình ảnh đại diện
- `translations`: Object chứa các bản dịch đa ngôn ngữ

## Translation Support

API hỗ trợ đa ngôn ngữ thông qua:
1. **Query parameter `language`**: Khi gọi GET, thêm `?language=en` hoặc `?language=vi`
2. **Translations object**: Khi tạo/cập nhật, có thể gửi translations object

### Cấu trúc translations:
```json
{
  "translations": {
    "en": {
      "title": "English Title",
      "description": "English Description",
      "content": "English Content"
    },
    "vi": {
      "title": "Tiêu đề tiếng Việt",
      "description": "Mô tả tiếng Việt",
      "content": "Nội dung tiếng Việt"
    }
  }
}
```

## Usage Examples

### Tạo tin tức mới với description
```bash
curl -X POST http://localhost:5000/api/news/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TienDaiPhat mở rộng kinh doanh",
    "description": "Công ty TienDaiPhat thông báo kế hoạch mở rộng hoạt động kinh doanh trong năm 2024",
    "content": "Nội dung chi tiết về kế hoạch mở rộng...",
    "image_url": "https://example.com/expansion.jpg"
  }'
```

### Lấy tin tức với translation
```bash
curl -X GET "http://localhost:5000/api/news/1?language=en"
```

### Cập nhật tin tức với description
```bash
curl -X PUT http://localhost:5000/api/news/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TienDaiPhat mở rộng kinh doanh - Cập nhật",
    "description": "Cập nhật thông tin về kế hoạch mở rộng",
    "content": "Nội dung cập nhật...",
    "image_url": "https://example.com/updated.jpg"
  }'
```

## Error Responses

### 404 Not Found
```json
{
  "message": "News not found"
}
```

### 400 Bad Request
Khi dữ liệu không hợp lệ hoặc thiếu trường bắt buộc.

## Notes

- Field `description` được trả về trong tất cả các response GET
- Field `description` có thể được cập nhật thông qua PUT request
- Field `description` hỗ trợ translation đa ngôn ngữ
- Nội dung `content` được xử lý qua CKEditor để hỗ trợ rich text
