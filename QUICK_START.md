# Quick Start Guide - AnaOi Frontend Deployment

## 🚀 Quick Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 2. Build Docker Image Locally

```bash
# Build image
docker build -t anaoi-frontend .

# Run container
docker run -p 80:80 anaoi-frontend

# Hoặc sử dụng docker-compose
docker-compose up -d
```

### 3. Setup Azure VM (One-time)

1. **Tạo Azure VM** với Ubuntu 20.04 hoặc mới hơn
2. **Mở ports** trong Network Security Group:
   - Port 22 (SSH)
   - Port 80 (HTTP)
3. **SSH vào VM** và cài Docker:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

### 4. Setup GitHub Secrets

Vào **Repository Settings → Secrets and variables → Actions**, thêm:

| Secret Name | Value | Example |
|------------|-------|---------|
| `AZURE_VM_HOST` | IP của Azure VM | `20.123.45.67` |
| `AZURE_VM_USERNAME` | SSH username | `azureuser` |
| `AZURE_VM_SSH_KEY` | Private SSH key | `-----BEGIN RSA...` |
| `AZURE_VM_PORT` | SSH port | `22` |

### 5. Deploy

#### Automatic (Recommended)
```bash
# Push to main branch
git push origin main
# GitHub Actions sẽ tự động deploy
```

#### Manual
```bash
# SSH vào Azure VM
ssh username@your-vm-ip

# Clone và deploy
git clone your-repo-url
cd anaooiProject
docker-compose up -d --build
```

## 📋 File Structure

```
.
├── Dockerfile              # Multi-stage build cho production
├── docker-compose.yml      # Docker Compose config
├── nginx.conf             # Nginx config cho React SPA
├── .dockerignore          # Files to exclude from Docker build
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD workflow
├── DEPLOY.md              # Chi tiết hướng dẫn deploy
├── .gitflow.md            # GitFlow workflow guide
└── QUICK_START.md         # File này
```

## 🔍 Verify Deployment

```bash
# Check container
docker ps

# Check logs
docker logs anaoi-frontend

# Test health
curl http://your-vm-ip/health
```

## 🆘 Common Issues

**Container không start?**
```bash
docker logs anaoi-frontend
```

**Port 80 đã dùng?**
```bash
sudo lsof -i :80
# Hoặc đổi port trong docker-compose.yml
```

**Permission denied?**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

## 📚 More Information

- Chi tiết deploy: Xem `DEPLOY.md`
- GitFlow workflow: Xem `.gitflow.md`

