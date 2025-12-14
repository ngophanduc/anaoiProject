# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy everything except what's in .dockerignore
# This ensures public/ and src/ are copied
COPY . .

# Verify public folder and index.html exist
RUN ls -la public/ && test -f public/index.html || (echo "ERROR: index.html not found in public/!" && ls -la && exit 1)

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
