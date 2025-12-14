#!/bin/bash

# Script để deploy ứng dụng với Docker

echo "🚀 Bắt đầu deploy ứng dụng..."

# Build Docker image
echo "📦 Đang build Docker image..."
docker-compose build

# Stop và remove container cũ (nếu có)
echo "🛑 Dừng container cũ..."
docker-compose down

# Start container mới
echo "▶️  Khởi động container mới..."
docker-compose up -d

# Kiểm tra status
echo "✅ Kiểm tra trạng thái container..."
docker-compose ps

# Hiển thị logs
echo "📋 Logs của container:"
docker-compose logs --tail=50

echo "🎉 Deploy hoàn tất!"

