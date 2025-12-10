# Hướng dẫn Deploy AnaOi Frontend

## Prerequisites

1. Azure VM đã được setup với:
   - Docker và Docker Compose đã cài đặt
   - SSH access được cấu hình
   - Port 80 đã được mở trong Azure Network Security Group

2. GitHub Secrets cần được cấu hình:
   - `AZURE_VM_HOST`: IP hoặc domain của Azure VM
   - `AZURE_VM_USERNAME`: Username để SSH vào VM
   - `AZURE_VM_SSH_KEY`: Private SSH key để authenticate
   - `AZURE_VM_PORT`: SSH port (mặc định 22)

## Setup Azure VM

### 1. Cài đặt Docker trên Azure VM

```bash
# SSH vào Azure VM
ssh username@your-vm-ip

# Update system
sudo apt-get update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 2. Cấu hình Firewall

```bash
# Mở port 80 cho HTTP
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 3. Tạo SSH Key Pair (nếu chưa có)

```bash
# Trên máy local
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key lên Azure VM
ssh-copy-id username@your-vm-ip
```

## Setup GitHub Secrets

1. Vào GitHub Repository → Settings → Secrets and variables → Actions
2. Thêm các secrets sau:

   - **AZURE_VM_HOST**: IP address của Azure VM (ví dụ: `20.123.45.67`)
   - **AZURE_VM_USERNAME**: Username để SSH (ví dụ: `azureuser`)
   - **AZURE_VM_SSH_KEY**: Nội dung của private SSH key (bắt đầu với `-----BEGIN RSA PRIVATE KEY-----`)
   - **AZURE_VM_PORT**: SSH port (mặc định `22`)

## Deploy

### Automatic Deployment (CI/CD)

1. Push code lên branch `main` hoặc `develop`
2. GitHub Actions sẽ tự động:
   - Build Docker image
   - Deploy lên Azure VM
   - Restart container

### Manual Deployment

#### Option 1: Sử dụng Docker Compose

```bash
# SSH vào Azure VM
ssh username@your-vm-ip

# Clone repository (hoặc pull latest code)
git clone your-repo-url
cd anaooiProject

# Build và run
docker-compose up -d --build
```

#### Option 2: Sử dụng Docker trực tiếp

```bash
# SSH vào Azure VM
ssh username@your-vm-ip

# Pull code
git pull origin main

# Build image
docker build -t anaoi-frontend:latest .

# Stop old container
docker stop anaoi-frontend || true
docker rm anaoi-frontend || true

# Run new container
docker run -d \
  --name anaoi-frontend \
  --restart unless-stopped \
  -p 80:80 \
  anaoi-frontend:latest
```

## Verify Deployment

```bash
# Check container status
docker ps

# Check logs
docker logs anaoi-frontend

# Test health endpoint
curl http://localhost/health

# Test từ browser
# Mở http://your-vm-ip trong browser
```

## Troubleshooting

### Container không start

```bash
# Check logs
docker logs anaoi-frontend

# Check nginx config
docker exec anaoi-frontend nginx -t
```

### Port 80 đã được sử dụng

```bash
# Check process sử dụng port 80
sudo lsof -i :80

# Hoặc đổi port trong docker-compose.yml
# ports:
#   - "8080:80"
```

### Permission denied

```bash
# Ensure user trong docker group
sudo usermod -aG docker $USER
newgrp docker
```

## Rollback

```bash
# List images
docker images

# Run previous version
docker stop anaoi-frontend
docker rm anaoi-frontend
docker run -d \
  --name anaoi-frontend \
  --restart unless-stopped \
  -p 80:80 \
  anaoi-frontend:previous-tag
```

## Monitoring

### Check container health

```bash
# Health check endpoint
curl http://localhost/health

# Container stats
docker stats anaoi-frontend
```

### View logs

```bash
# Real-time logs
docker logs -f anaoi-frontend

# Last 100 lines
docker logs --tail 100 anaoi-frontend
```

