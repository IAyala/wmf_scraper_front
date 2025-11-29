# Deployment Guide

## Environment Configuration

This application uses different API endpoints based on the environment:

- **Development**: `http://localhost:8000`
- **Production (Fly.io)**: `https://wmf-scraper.fly.dev`

## API Key Authentication

In production, all API requests include an API key header (`X-API-Key`) for authentication.

## Local Development

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. (Optional) Set your API key in `.env.local`:
   ```
   REACT_APP_API_KEY=your-development-api-key
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Fly.io Deployment

### Prerequisites

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Login to Fly.io: `flyctl auth login`
3. Have your production API key ready

### Deploy

Run the deployment script with your credentials:

```bash
./deploy-fly.sh API_KEY ADMIN_USERNAME ADMIN_PASSWORD
```

Example:
```bash
./deploy-fly.sh "your-api-key" "admin" "secure-password-123"
```

This script will:
1. Check if flyctl is installed and you're logged in
2. Create the Fly.io app (if it doesn't exist)  
3. Set secrets in Fly.io (API_KEY, ADMIN_USERNAME, ADMIN_PASSWORD)
4. Build and deploy the application with secure credentials

### Manual Deployment

If you prefer manual deployment:

1. Set the secrets:
   ```bash
   flyctl secrets set API_KEY="your-api-key" ADMIN_USERNAME="admin" ADMIN_PASSWORD="secure-password"
   ```

2. Deploy with build arguments:
   ```bash
   flyctl deploy \
     --build-arg REACT_APP_API_KEY="your-api-key" \
     --build-arg REACT_APP_ADMIN_USERNAME="admin" \
     --build-arg REACT_APP_ADMIN_PASSWORD="secure-password"
   ```

### Environment Variables

- `REACT_APP_API_KEY`: Build-time API key (passed as Docker build argument)
- `REACT_APP_ADMIN_USERNAME`: Build-time admin username (passed as Docker build argument)  
- `REACT_APP_ADMIN_PASSWORD`: Build-time admin password (passed as Docker build argument)

### Security Notes

- Credentials are passed as build arguments (not stored in Dockerfile)
- Secrets are also stored in Fly.io for reference
- No default credentials in the Docker image
- Application will show error if credentials not properly configured

## Configuration Files

- `fly.toml`: Fly.io application configuration
- `Dockerfile`: Multi-stage build for production
- `src/config/api.ts`: API configuration and authentication
- `.env.example`: Template for environment variables