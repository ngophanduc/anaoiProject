# Hướng dẫn Setup HTTPS

## So sánh HTTP vs HTTPS

### HTTP (Port 80)
- ❌ Không mã hóa dữ liệu
- ❌ Dễ bị tấn công man-in-the-middle
- ❌ Trình duyệt hiển thị "Not Secure"
- ✅ Đơn giản, không cần certificate

### HTTPS (Port 443)
- ✅ Mã hóa dữ liệu (SSL/TLS)
- ✅ Bảo mật cao, xác thực server
- ✅ Trình duyệt hiển thị khóa xanh
- ✅ Tốt cho SEO
- ✅ Bắt buộc cho các tính năng hiện đại (PWA, Service Worker, etc.)
- ⚠️ Cần SSL certificate

---

## Cách 1: Sử dụng Let's Encrypt (Miễn phí, Khuyến nghị)

### Yêu cầu:
- ✅ Có domain name (ví dụ: `anaoi.com`)
- ✅ Domain trỏ về IP máy chủ (`20.24.216.101`)
- ✅ Port 80 và 443 mở trên Azure Firewall

### Bước 1: Cài đặt Certbot trên máy chủ

```bash
# SSH vào máy chủ
ssh azureuser@20.24.216.101

# Cài đặt Certbot
sudo apt-get update
sudo apt-get install -y certbot

# Tạo thư mục SSL
cd ~/anaoiProject
mkdir -p ssl
```

### Bước 2: Tạm thời dừng container để lấy certificate

```bash
# Dừng container
sudo docker-compose down

# Lấy certificate (thay YOUR_DOMAIN bằng domain của bạn)
sudo certbot certonly --standalone -d YOUR_DOMAIN --email your-email@example.com --agree-tos

# Copy certificates
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem ssl/key.pem
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem
```

### Bước 3: Cập nhật docker-compose.yml

```bash
# Sử dụng docker-compose-https.yml
cp docker-compose-https.yml docker-compose.yml
```

### Bước 4: Rebuild và start container

```bash
sudo docker-compose up -d --build
```

### Bước 5: Kiểm tra

Truy cập: `https://YOUR_DOMAIN`

### Bước 6: Tự động renew certificate (Quan trọng!)

Let's Encrypt certificates hết hạn sau 90 ngày. Cần renew tự động:

```bash
# Tạo script renew
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
certbot renew --quiet
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem /home/azureuser/anaoiProject/ssl/cert.pem
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem /home/azureuser/anaoiProject/ssl/key.pem
sudo docker exec anaoi-project nginx -s reload
EOF

chmod +x renew-ssl.sh

# Thêm vào crontab (chạy mỗi ngày lúc 2:00 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/azureuser/anaoiProject/renew-ssl.sh") | crontab -
```

---

## Cách 2: Sử dụng Self-Signed Certificate (Chỉ để test)

⚠️ **Lưu ý**: Self-signed certificate sẽ hiển thị cảnh báo trên trình duyệt.

```bash
# Tạo thư mục SSL
mkdir -p ssl

# Tạo self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -subj "/C=VN/ST=State/L=City/O=Organization/CN=20.24.216.101"

# Cập nhật docker-compose.yml để sử dụng HTTPS
cp docker-compose-https.yml docker-compose.yml

# Rebuild và start
sudo docker-compose up -d --build
```

---

## Cách 3: Sử dụng Cloudflare (Khuyến nghị cho production)

1. Đăng ký Cloudflare và thêm domain
2. Cấu hình DNS trỏ về IP máy chủ
3. Bật "Full (strict)" SSL mode
4. Cloudflare sẽ tự động cung cấp SSL certificate

---

## Kiểm tra Azure Firewall

Đảm bảo có rule cho port 443:

- **Name**: `https`
- **Port**: `443`
- **Protocol**: `TCP`
- **Action**: `Allow`
- **Priority**: `140` (sau rule port 80)

---

## Troubleshooting

### Lỗi: "SSL certificate not found"
```bash
# Kiểm tra file certificate
ls -la ssl/
# Phải có: cert.pem và key.pem
```

### Lỗi: "Permission denied"
```bash
# Fix permissions
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem
```

### Container không start
```bash
# Xem logs
sudo docker-compose logs
```

### Certificate hết hạn
```bash
# Renew manually
sudo certbot renew
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem ssl/key.pem
sudo docker exec anaoi-project nginx -s reload
```

