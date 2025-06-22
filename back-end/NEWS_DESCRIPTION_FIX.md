# Hướng dẫn sửa lỗi Description Field trong News API

## Vấn đề
Trường `description` trong API GET news đang trả về `null` thay vì giá trị thực tế.

## Nguyên nhân có thể

### 1. Database Schema Issue
- Bảng `new` chưa được tạo
- Cột `description` chưa tồn tại trong bảng `new`
- Migration chưa được chạy

### 2. Data Issue
- Các record hiện tại có `description` là `NULL`
- Dữ liệu không được lưu đúng cách

### 3. Code Issue
- Model `New` không có field `description`
- Method `to_dict()` không trả về `description`
- NewsService không xử lý `description` đúng cách

## Cách kiểm tra và sửa lỗi

### Bước 1: Kiểm tra Database Schema

Chạy script kiểm tra:
```bash
cd back-end
python fix_news_description.py
```

Script này sẽ:
- Kiểm tra xem bảng `new` có tồn tại không
- Kiểm tra xem cột `description` có tồn tại không
- Hiển thị cấu trúc bảng
- Kiểm tra dữ liệu hiện tại
- Tạo dữ liệu test

### Bước 2: Chạy Migration (nếu cần)

Nếu bảng hoặc cột chưa tồn tại, chạy migration:
```bash
cd back-end
flask db upgrade
```

### Bước 3: Kiểm tra Model

Đảm bảo model `New` có field `description`:

```python
# back-end/app/models/new.py
class New(db.Model):
    __tablename__ = 'new'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)  # Đảm bảo có dòng này
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,  # Đảm bảo có dòng này
            'content': self.content,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
```

### Bước 4: Kiểm tra NewsService

Đảm bảo NewsService xử lý `description` đúng cách:

```python
# back-end/app/utils/news_service.py
@staticmethod
def create_translation(key: str, language: str, value: str, model_name: str) -> Translation:
    news = New(
        title=data['title'],
        description=data.get('description', ''),  # Đảm bảo có dòng này
        content=processed_content,
        image_url=data.get('image_url')
    )
```

### Bước 5: Test API

Sau khi sửa lỗi, test API:

```bash
# Test tạo news với description
curl -X POST http://localhost:5000/api/news/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test News",
    "description": "Test Description",
    "content": "Test Content",
    "image_url": "https://example.com/image.jpg"
  }'

# Test lấy tất cả news
curl -X GET http://localhost:5000/api/news/

# Test lấy news theo ID
curl -X GET http://localhost:5000/api/news/1
```

## Các file đã được cập nhật

1. **Model**: `back-end/app/models/new.py` - Đã có field description
2. **Service**: `back-end/app/utils/news_service.py` - Đã xử lý description
3. **Controller**: `back-end/app/controllers/news_controller.py` - Đã hỗ trợ description
4. **API Docs**: `back-end/app/docs/api.py` - Đã có description trong model
5. **Migration**: `back-end/migrations/versions/add_new_table_with_description.py` - Tạo bảng với description

## Debug Scripts

### 1. Script kiểm tra tổng quát
```bash
python fix_news_description.py
```

### 2. Script test API
```bash
python test_news_simple.py
```

### 3. Script debug chi tiết
```bash
python debug_news_description.py
```

## Kết quả mong đợi

Sau khi sửa lỗi, API response sẽ có dạng:

```json
{
  "id": 1,
  "title": "Test News Title",
  "description": "This is a test description",
  "content": "This is the content of the news article.",
  "image_url": "https://example.com/image.jpg",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

## Troubleshooting

### Nếu vẫn trả về null:

1. **Kiểm tra database trực tiếp**:
   ```sql
   SELECT id, title, description, content FROM new;
   ```

2. **Kiểm tra log Flask**:
   ```bash
   flask run --debug
   ```

3. **Kiểm tra ContentHandler**:
   Đảm bảo `ContentHandler.process_model_for_display` không làm mất field description

4. **Kiểm tra TranslationService**:
   Đảm bảo translation không ghi đè description thành null

### Nếu database connection lỗi:

1. **Sử dụng SQLite tạm thời**:
   ```python
   # Trong config.py
   SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
   ```

2. **Chạy với Docker**:
   ```bash
   docker-compose up -d
   ```
