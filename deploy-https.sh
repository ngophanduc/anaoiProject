#!/bin/bash

# Script deploy với HTTPS
# Sử dụng: ./deploy-https.sh [self-signed|letsencrypt]

set -e

echo "=== Deploy Anaoi Project với HTTPS ==="

# Kiểm tra thư mục ssl
if [ ! -d "ssl" ]; then
    echo "📁 Tạo thư mục ssl..."
    mkdir -p ssl
fi

# Kiểm tra SSL certificates
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "⚠️  SSL certificates chưa có!"
    echo ""
    echo "Chọn phương thức tạo SSL:"
    echo "1. Self-signed (để test nhanh)"
    echo "2. Let's Encrypt (production - cần domain)"
    read -p "Chọn (1 hoặc 2): " choice
    
    if [ "$choice" = "1" ]; then
        echo "🔐 Tạo self-signed certificate..."
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/key.pem \
            -out ssl/cert.pem \
            -subj "/C=VN/ST=State/L=City/O=Anaoi/CN=20.24.216.101"
        echo "✅ Self-signed certificate đã được tạo!"
        echo "⚠️  Lưu ý: Trình duyệt sẽ hiển thị cảnh báo với self-signed certificate"
    elif [ "$choice" = "2" ]; then
        read -p "Nhập domain name: " DOMAIN
        read -p "Nhập email: " EMAIL
        
        echo "🔐 Lấy certificate từ Let's Encrypt..."
        echo "⚠️  Cần dừng container trước..."
        sudo docker-compose down || true
        
        sudo certbot certonly --standalone -d $DOMAIN --email $EMAIL --agree-tos --non-interactive
        
        sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
        sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem
        sudo chmod 644 ssl/cert.pem
        sudo chmod 600 ssl/key.pem
        
        echo "✅ Let's Encrypt certificate đã được tạo!"
    else
        echo "❌ Lựa chọn không hợp lệ!"
        exit 1
    fi
else
    echo "✅ SSL certificates đã tồn tại"
fi

# Pull code mới (nếu có Git)
if [ -d ".git" ]; then
    echo "📥 Pull code mới từ Git..."
    git pull origin main || echo "⚠️  Không thể pull, tiếp tục với code hiện tại"
fi

# Build và start container
echo "🔨 Build và start container..."
sudo docker-compose down
sudo docker-compose up -d --build

# Kiểm tra container
echo "⏳ Đợi container start..."
sleep 5

if sudo docker ps | grep -q anaoi-project; then
    echo "✅ Container đã start thành công!"
    echo ""
    echo "🌐 Truy cập:"
    echo "   - HTTP:  http://20.24.216.101 (sẽ redirect sang HTTPS)"
    echo "   - HTTPS: https://20.24.216.101"
    echo ""
    echo "📋 Xem logs: sudo docker-compose logs -f"
else
    echo "❌ Container không start được!"
    echo "📋 Xem logs: sudo docker-compose logs"
    exit 1
fi

