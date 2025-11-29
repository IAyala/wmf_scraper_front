# Multi-stage build for minimal production image

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci --silent

# Copy source code and configuration files
COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json ./

# Accept build arguments (no defaults for security)
ARG REACT_APP_API_KEY
ARG REACT_APP_ADMIN_USERNAME  
ARG REACT_APP_ADMIN_PASSWORD

ENV REACT_APP_API_KEY=$REACT_APP_API_KEY
ENV REACT_APP_ADMIN_USERNAME=$REACT_APP_ADMIN_USERNAME
ENV REACT_APP_ADMIN_PASSWORD=$REACT_APP_ADMIN_PASSWORD

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration for React Router
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /static/ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    location /health { \
        access_log off; \
        return 200 "healthy\n"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]