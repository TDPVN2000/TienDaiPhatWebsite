# Tích hợp i18n cho tất cả các API

## Tổng quan

Tất cả các API trong hệ thống đã được tích hợp tính năng đa ngôn ngữ (i18n) để hỗ trợ tiếng Việt và tiếng Anh. Mỗi API có thể nhận tham số `language` để trả về dữ liệu đã được dịch.

## Các API đã tích hợp i18n

### 1. News API
- **Endpoint**: `/api/news/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `title`, `description`, `content`
- **Ví dụ**: `GET /api/news/?language=en`

### 2. Recruitment API
- **Endpoint**: `/api/recruitment/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `position`, `des_position`, `address`
- **Ví dụ**: `GET /api/recruitment/?language=en`

### 3. Field API
- **Endpoint**: `/api/fields/`
- **Method**: GET
- **Tham số**: `language` (optional), `include_children` (optional)
- **Trường được dịch**: `name`, `description`
- **Ví dụ**: `GET /api/fields/?language=en&include_children=true`

### 4. Product API
- **Endpoint**: `/api/products/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `name`, `description`, `features`
- **Ví dụ**: `GET /api/products/?language=en`

### 5. Introduction API
- **Endpoint**: `/api/introductions/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `title`, `content`
- **Ví dụ**: `GET /api/introductions/?language=en`

### 6. Project API
- **Endpoint**: `/api/projects/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `name`, `description`
- **Ví dụ**: `GET /api/projects/?language=en`

### 7. Investment API
- **Endpoint**: `/api/investments/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `title`, `description`, `value`, `unit`
- **Ví dụ**: `GET /api/investments/?language=en`

### 8. Capability API
- **Endpoint**: `/api/capabilities/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `name`, `description`
- **Ví dụ**: `GET /api/capabilities/?language=en`

### 9. Certification API
- **Endpoint**: `/api/certifications/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `name`, `description`
- **Ví dụ**: `GET /api/certifications/?language=en`

### 10. Table Data API
- **Endpoint**: `/api/table-data/`
- **Method**: GET
- **Tham số**: `language` (optional)
- **Trường được dịch**: `name`
- **Ví dụ**: `GET /api/table-data/?language=en`

## Cách sử dụng

### 1. Lấy dữ liệu tiếng Việt (mặc định)
```bash
curl "http://localhost:5555/api/news/"
```

### 2. Lấy dữ liệu tiếng Anh
```bash
curl "http://localhost:5555/api/news/?language=en"
```

### 3. Lấy dữ liệu tiếng Việt (rõ ràng)
```bash
curl "http://localhost:5555/api/news/?language=vi"
```

## Tạo và cập nhật dữ liệu với translations

### Ví dụ tạo news với translations
```json
{
  "title": "Tiêu đề tiếng Việt",
  "description": "Mô tả tiếng Việt",
  "content": "Nội dung tiếng Việt",
  "image_url": "https://example.com/image.jpg",
  "translations": {
    "en": {
      "title": "English Title",
      "description": "English Description",
      "content": "English Content"
    }
  }
}
```

### Ví dụ tạo recruitment với translations
```json
{
  "position": "Vị trí tiếng Việt",
  "des_position": "Mô tả vị trí tiếng Việt",
  "address": "Địa chỉ tiếng Việt",
  "status": "active",
  "translations": {
    "en": {
      "position": "English Position",
      "des_position": "English Position Description",
      "address": "English Address"
    }
  }
}
```

### Ví dụ tạo investment với translations
```json
{
  "title": "Tiêu đề đầu tư tiếng Việt",
  "description": "Mô tả đầu tư tiếng Việt",
  "value": "Giá trị tiếng Việt",
  "unit": "Đơn vị tiếng Việt",
  "field_id": 1,
  "translations": {
    "en": {
      "title": "English Investment Title",
      "description": "English Investment Description",
      "value": "English Value",
      "unit": "English Unit"
    }
  }
}
```

## Cấu trúc translations

Mỗi object translations có cấu trúc:
```json
{
  "translations": {
    "en": {
      "field_name": "English translation",
      "field_name2": "English translation 2"
    },
    "vi": {
      "field_name": "Vietnamese translation",
      "field_name2": "Vietnamese translation 2"
    }
  }
}
```

## Các trường được hỗ trợ dịch

### News
- `title` - Tiêu đề tin tức
- `description` - Mô tả tin tức
- `content` - Nội dung tin tức (HTML)

### Recruitment
- `position` - Vị trí công việc
- `des_position` - Mô tả vị trí (HTML)
- `address` - Địa chỉ làm việc

### Field
- `name` - Tên lĩnh vực
- `description` - Mô tả lĩnh vực

### Product
- `name` - Tên sản phẩm
- `description` - Mô tả sản phẩm (HTML)
- `features` - Tính năng sản phẩm (HTML)

### Introduction
- `title` - Tiêu đề giới thiệu
- `content` - Nội dung giới thiệu (HTML)

### Project
- `name` - Tên dự án
- `description` - Mô tả dự án (HTML)

### Investment
- `title` - Tiêu đề đầu tư
- `description` - Mô tả đầu tư (HTML)
- `value` - Giá trị đầu tư
- `unit` - Đơn vị đầu tư

### Capability
- `name` - Tên năng lực
- `description` - Mô tả năng lực (HTML)

### Certification
- `name` - Tên chứng nhận
- `description` - Mô tả chứng nhận (HTML)

### Table Data
- `name` - Tên bảng dữ liệu

## Xử lý CKEditor content

Các trường có thể chứa HTML (như `content`, `description`) sẽ được xử lý qua CKEditor:
- Tự động upload và quản lý hình ảnh
- Cleanup hình ảnh cũ khi cập nhật
- Hỗ trợ đầy đủ HTML formatting

## Translation Service

Hệ thống sử dụng `TranslationService` để:
- Lưu trữ translations trong database
- Tự động dịch dữ liệu khi có tham số `language`
- Quản lý lifecycle của translations (create, update, delete)

## Lưu ý

1. **Ngôn ngữ mặc định**: Nếu không có tham số `language`, API sẽ trả về dữ liệu gốc (thường là tiếng Việt)
2. **Fallback**: Nếu không có bản dịch cho ngôn ngữ yêu cầu, sẽ trả về dữ liệu gốc
3. **Performance**: Translations được cache để tối ưu hiệu suất
4. **Validation**: Tất cả input đều được validate trước khi lưu
5. **HTML Content**: Các trường có thể chứa HTML được đánh dấu trong danh sách trên

## Testing

Để test tính năng i18n:

```bash
# Test API fields
curl "http://localhost:5555/api/fields/"

# Test với language parameter
curl "http://localhost:5555/api/fields/?language=en"

# Test API news
curl "http://localhost:5555/api/news/?language=en"

# Test API recruitment
curl "http://localhost:5555/api/recruitment/?language=en"

# Test API investment
curl "http://localhost:5555/api/investments/?language=en"
```

## Migration

Nếu cần thêm ngôn ngữ mới, chỉ cần:
1. Thêm language code vào `TranslationService.get_all_languages()`
2. Cập nhật frontend để hỗ trợ ngôn ngữ mới
3. Tạo translations cho dữ liệu hiện có
