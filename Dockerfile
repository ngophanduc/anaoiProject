# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy everything except what's in .dockerignore
COPY . .

# Verify public folder and index.html exist
RUN ls -la public/ && test -f public/index.html || (echo "ERROR: index.html not found in public/!" && ls -la && exit 1)

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration (HTTPS version)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Expose ports 80 (HTTP redirect) and 443 (HTTPS)
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
