#!/bin/bash

# Script setup migration từ đầu cho dự án TienDaiPhatWebsite
# Sử dụng: ./setup_migrations.sh

set -e  # Dừng script nếu có lỗi

echo "🚀 Bắt đầu setup migration từ đầu..."

# Kiểm tra xem có đang ở thư mục back-end không
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Lỗi: Vui lòng chạy script này từ thư mục back-end"
    exit 1
fi

# Bước 1: Dừng các container
echo "📦 Dừng các container..."
docker compose down

# Bước 2: Xóa volume database (nếu có)
echo "🗑️  Xóa volume database cũ..."
docker volume rm back-end_postgres_data 2>/dev/null || echo "Volume không tồn tại, bỏ qua"

# Bước 3: Xóa các file migration cũ
echo "🧹 Xóa các file migration cũ..."
rm -rf migrations/versions/*

# Bước 4: Copy file migration mới
echo "📋 Copy file migration mới..."
cp migrations/versions/001_initial_schema.py migrations/versions/ 2>/dev/null || echo "File migration đã tồn tại"

# Bước 5: Khởi động database
echo "🔧 Khởi động database..."
docker compose up -d db

# Bước 6: Đợi database sẵn sàng
echo "⏳ Đợi database sẵn sàng..."
sleep 10

# Bước 7: Khởi động web container
echo "🌐 Khởi động web container..."
docker compose up -d web

# Bước 8: Đợi web container sẵn sàng
echo "⏳ Đợi web container sẵn sàng..."
sleep 15

# Bước 9: Chạy migration
echo "🔄 Chạy migration..."
docker compose exec web alembic -c /app/migrations/alembic.ini upgrade head

echo "✅ Setup migration hoàn tất!"
echo ""
echo "📊 Kiểm tra trạng thái:"
docker compose ps

echo ""
echo "🔗 API Documentation: http://localhost:5555/api/docs"
echo "🌐 Frontend: http://localhost:3000"
