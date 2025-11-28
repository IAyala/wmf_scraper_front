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

Run the deployment script with your API key:

```bash
./deploy-fly.sh YOUR_PRODUCTION_API_KEY
```

This script will:
1. Check if flyctl is installed and you're logged in
2. Create the Fly.io app (if it doesn't exist)
3. Set the API_KEY secret in Fly.io
4. Build and deploy the application

### Manual Deployment

If you prefer manual deployment:

```bash
flyctl deploy --build-arg REACT_APP_API_KEY="your-production-api-key"
```

### Environment Variables

- `REACT_APP_API_KEY`: Build-time API key (passed as Docker build argument)

## Configuration Files

- `fly.toml`: Fly.io application configuration
- `Dockerfile`: Multi-stage build for production
- `src/config/api.ts`: API configuration and authentication
- `.env.example`: Template for environment variables