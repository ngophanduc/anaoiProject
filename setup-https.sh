#!/bin/bash

# Script để setup HTTPS với Let's Encrypt

echo "=== Setup HTTPS cho Anaoi Project ==="

# Kiểm tra domain name
read -p "Nhập domain name của bạn (ví dụ: example.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Domain name không được để trống!"
    exit 1
fi

echo "📋 Domain: $DOMAIN"

# Cài đặt Certbot
echo "📦 Đang cài đặt Certbot..."
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Tạo thư mục SSL
echo "📁 Tạo thư mục SSL..."
mkdir -p ssl

# Lấy SSL certificate từ Let's Encrypt
echo "🔐 Đang lấy SSL certificate từ Let's Encrypt..."
echo "⚠️  Lưu ý: Domain $DOMAIN phải trỏ về IP máy chủ này!"
read -p "Nhấn Enter để tiếp tục..."

# Sử dụng Certbot standalone mode (vì Nginx đang chạy trong Docker)
sudo certbot certonly --standalone -d $DOMAIN --email admin@$DOMAIN --agree-tos --non-interactive

# Copy certificates vào thư mục ssl
echo "📋 Copy certificates..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem

echo "✅ SSL certificates đã được tạo!"
echo ""
echo "📝 Bước tiếp theo:"
echo "1. Cập nhật nginx.conf với nginx-https.conf"
echo "2. Cập nhật docker-compose.yml để mount thư mục ssl"
echo "3. Restart container: sudo docker-compose down && sudo docker-compose up -d --build"
echo ""
echo "🔄 Để tự động renew certificate, thêm vào crontab:"
echo "0 0 * * * certbot renew --quiet && docker cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem anaoi-project:/etc/nginx/ssl/cert.pem && docker cp /etc/letsencrypt/live/$DOMAIN/privkey.pem anaoi-project:/etc/nginx/ssl/key.pem && docker exec anaoi-project nginx -s reload"

