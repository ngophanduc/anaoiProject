#!/bin/bash

# Script để fix CAA và lấy SSL certificate

echo "=== Fix CAA và Setup SSL ==="

# Bước 1: Dừng container
echo "🛑 Dừng container..."
sudo docker-compose down

# Bước 2: Kiểm tra port 80
echo "🔍 Kiểm tra port 80..."
if sudo ss -tlnp | grep -q ":80 "; then
    echo "⚠️  Port 80 đang được sử dụng!"
    echo "Đang tìm process..."
    sudo ss -tlnp | grep ":80 "
    echo "Vui lòng dừng process trên port 80 trước!"
    exit 1
else
    echo "✅ Port 80 đã sẵn sàng"
fi

# Bước 3: Đợi DNS propagate (nếu vừa thêm CAA)
echo "⏳ Đợi 30 giây để DNS propagate..."
sleep 30

# Bước 4: Lấy SSL certificate
echo "🔐 Lấy SSL certificate từ Let's Encrypt..."
sudo certbot certonly --standalone \
  -d anaoivn.com \
  -d www.anaoivn.com \
  --email phanduc01213@gmail.com \
  --agree-tos \
  --non-interactive

# Bước 5: Copy certificates
echo "📋 Copy certificates..."
mkdir -p ssl
sudo cp /etc/letsencrypt/live/anaoivn.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/anaoivn.com/privkey.pem ssl/key.pem
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem

echo "✅ SSL certificates đã được tạo!"

# Bước 6: Build và start container
echo "🔨 Build và start container..."
sudo docker-compose up -d --build

echo "✅ Hoàn tất!"
echo ""
echo "🌐 Truy cập: https://anaoivn.com"

