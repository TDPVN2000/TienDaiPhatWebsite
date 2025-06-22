# Translation API Documentation

## Overview
Translation API cho phép quản lý các bản dịch đa ngôn ngữ cho website TienDaiPhat.

## Endpoints

### 1. Tạo translation mới
**POST** `/api/translations/`

**Request Body:**
```json
{
  "key": "welcome_message",
  "language": "en",
  "value": "Welcome to TienDaiPhat",
  "model_name": "field"
}
```

**Model Name Enum Values:**
- `field` - Field model
- `introduction` - Introduction model
- `investment` - Investment model
- `product` - Product model
- `project` - Project model
- `recruitment` - Recruitment model
- `table_data` - TableData model
- `capability` - Capability model
- `certification` - Certification model
- `new` - News model

**Language Code Enum Values:**
- `en` - English
- `vi` - Vietnamese

### 2. Lấy danh sách translations
**GET** `/api/translations/`

**Query Parameters:**
- `language` (optional): Filter by language code
- `model_name` (optional): Filter by model name

**Example:**
```
GET /api/translations/?language=en&model_name=field
```

### 3. Lấy danh sách model names
**GET** `/api/translations/model-names/`

**Response:**
```json
{
  "model_names": [
    "field",
    "introduction",
    "investment",
    "product",
    "project",
    "recruitment",
    "table_data",
    "capability",
    "certification",
    "new"
  ]
}
```

### 4. Lấy danh sách language codes
**GET** `/api/translations/languages/`

**Response:**
```json
{
  "languages": ["en", "vi"]
}
```

### 5. Lấy translation theo ID
**GET** `/api/translations/{translation_id}`

### 6. Cập nhật translation
**PUT** `/api/translations/{translation_id}`

**Request Body:**
```json
{
  "key": "welcome_message",
  "language": "vi",
  "value": "Chào mừng đến với TienDaiPhat",
  "model_name": "field"
}
```

### 7. Xóa translation
**DELETE** `/api/translations/{translation_id}`

## Error Responses

### 400 Bad Request
Khi `model_name` hoặc `language` không hợp lệ:
```json
{
  "message": "Invalid model name: invalid_model"
}
```

### 404 Not Found
Khi translation không tồn tại:
```json
{
  "message": "Translation not found"
}
```

## Validation Rules

1. **model_name** phải là một trong các giá trị enum đã định nghĩa
2. **language** phải là một trong các mã ngôn ngữ được hỗ trợ (en, vi)
3. **key** phải là duy nhất cho mỗi cặp (language, model_name)
4. **value** không được để trống

## Usage Examples

### Tạo translation cho field
```bash
curl -X POST http://localhost:5000/api/translations/ \
  -H "Content-Type: application/json" \
  -d '{
    "key": "field_name",
    "language": "en",
    "value": "Medical Equipment",
    "model_name": "field"
  }'
```

### Tạo translation cho product
```bash
curl -X POST http://localhost:5000/api/translations/ \
  -H "Content-Type: application/json" \
  -d '{
    "key": "product_description",
    "language": "vi",
    "value": "Mô tả sản phẩm y tế",
    "model_name": "product"
  }'
```
