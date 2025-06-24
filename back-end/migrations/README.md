# Database Migrations

## Tổng quan

Thư mục này chứa các file migration để quản lý schema cơ sở dữ liệu của dự án TienDaiPhatWebsite.

## Cấu trúc

```
migrations/
├── README.md                    # File này
├── alembic.ini                  # Cấu hình Alembic
├── env.py                       # Cấu hình môi trường migration
└── versions/                    # Các file migration
    ├── 001_initial_schema.py    # Migration đầu tiên - tạo tất cả bảng
    └── ...                      # Các migration khác (nếu có)
```

## Setup từ đầu

### 1. Xóa các file migration cũ (nếu có)

```bash
# Xóa tất cả file migration cũ
rm -rf migrations/versions/*
```

### 2. Copy file migration mới

```bash
# Copy file migration 001_initial_schema.py vào thư mục versions
cp 001_initial_schema.py migrations/versions/
```

### 3. Reset database (nếu cần)

```bash
# Xóa và tạo lại database
docker compose down
docker volume rm back-end_postgres_data
docker compose up -d db
```

### 4. Chạy migration

```bash
# Chạy migration từ đầu
docker compose exec web alembic -c /app/migrations/alembic.ini upgrade head
```

## Các bảng được tạo

Migration `001_initial_schema.py` sẽ tạo các bảng sau:

1. **field** - Lĩnh vực hoạt động
2. **new** - Tin tức
3. **certification** - Chứng chỉ
4. **project** - Dự án
5. **investment** - Đầu tư
6. **introduction** - Giới thiệu
7. **capability** - Năng lực
8. **product** - Sản phẩm
9. **table_data** - Dữ liệu bảng
10. **recruitment** - Tuyển dụng
11. **translation** - Bản dịch

## Đặc điểm

- Tất cả bảng đều có cột `created_at` và `updated_at` với giá trị mặc định
- Các bảng liên quan đến `field` có foreign key với cascade delete
- Bảng `translation` có unique constraint để tránh duplicate
- Bảng `recruitment` có cột `is_active` để quản lý trạng thái

## Lưu ý

- Migration này được thiết kế để chạy từ đầu, không phụ thuộc vào migration cũ
- Nếu cần thêm migration mới, hãy tạo file với revision ID tiếp theo (002_, 003_, ...)
- Luôn test migration trên môi trường development trước khi deploy
