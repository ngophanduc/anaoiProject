#!/bin/bash

# Script kiểm tra và fix website

echo "=== Kiểm tra trạng thái website ==="

# Kiểm tra container
echo "🔍 Kiểm tra container..."
if sudo docker ps | grep -q anaoi-project; then
    echo "✅ Container đang chạy"
    sudo docker ps | grep anaoi-project
else
    echo "❌ Container KHÔNG chạy!"
    echo ""
    echo "Có 2 lựa chọn:"
    echo "1. Start container với self-signed certificate (để test ngay)"
    echo "2. Đợi SSL certificate từ Let's Encrypt"
    read -p "Chọn (1 hoặc 2): " choice
    
    if [ "$choice" = "1" ]; then
        echo "🔐 Tạo self-signed certificate..."
        mkdir -p ssl
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/key.pem \
            -out ssl/cert.pem \
            -subj "/C=VN/ST=State/L=City/O=Anaoi/CN=20.24.216.101"
        sudo chmod 644 ssl/cert.pem
        sudo chmod 600 ssl/key.pem
        
        echo "🔨 Start container..."
        sudo docker-compose up -d --build
    else
        echo "⏳ Đợi DNS propagate và lấy SSL certificate từ Let's Encrypt"
        exit 0
    fi
fi

# Kiểm tra port
echo ""
echo "🔍 Kiểm tra port 80 và 443..."
sudo ss -tlnp | grep -E ':(80|443) '

# Kiểm tra logs
echo ""
echo "📋 Logs gần đây:"
sudo docker-compose logs --tail=20

# Kiểm tra container status
echo ""
echo "📊 Container status:"
sudo docker ps -a | grep anaoi-project

echo ""
echo "🌐 Truy cập:"
echo "   - HTTP:  http://20.24.216.101"
echo "   - HTTPS: https://20.24.216.101 (nếu có SSL)"

