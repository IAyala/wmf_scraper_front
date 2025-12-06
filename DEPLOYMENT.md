# Deployment Guide

## Environment Configuration

This application uses different API endpoints based on the environment:

- **Development**: `http://localhost:8000`
- **Production (Fly.io)**: `https://wmf-scraper.fly.dev`

## Authentication System

### API Authentication
In production, all API requests include an API key in the Authorization header (`Bearer <token>`) for backend authentication.

### Role-Based User Authentication
The application supports two user roles with different permission levels:

- **Admin**: Can view all data and reports, but cannot add or load competitions
- **Superadmin**: Full access including adding and loading new competitions

Only superadmin users will see "Add Competition" and "Load Competition" navigation items.

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
./deploy-fly.sh API_KEY ADMIN_USERNAME ADMIN_PASSWORD SUPERADMIN_USERNAME SUPERADMIN_PASSWORD
```

Example:
```bash
./deploy-fly.sh "your-api-key" "admin" "admin-password" "superadmin" "super-secure-password"
```

This script will:
1. Check if flyctl is installed and you're logged in
2. Create the Fly.io app (if it doesn't exist)  
3. Set secrets in Fly.io (API_KEY, ADMIN_USERNAME, ADMIN_PASSWORD, SUPERADMIN_USERNAME, SUPERADMIN_PASSWORD)
4. Build and deploy the application with secure role-based credentials

### Manual Deployment

If you prefer manual deployment:

1. Set the secrets:
   ```bash
   flyctl secrets set \
     API_KEY="your-api-key" \
     ADMIN_USERNAME="admin" \
     ADMIN_PASSWORD="admin-password" \
     SUPERADMIN_USERNAME="superadmin" \
     SUPERADMIN_PASSWORD="superadmin-password"
   ```

2. Deploy with build arguments:
   ```bash
   flyctl deploy \
     --build-arg REACT_APP_API_KEY="your-api-key" \
     --build-arg REACT_APP_ADMIN_USERNAME="admin" \
     --build-arg REACT_APP_ADMIN_PASSWORD="admin-password" \
     --build-arg REACT_APP_SUPERADMIN_USERNAME="superadmin" \
     --build-arg REACT_APP_SUPERADMIN_PASSWORD="superadmin-password"
   ```

### Environment Variables

- `REACT_APP_API_KEY`: Build-time API key (passed as Docker build argument)
- `REACT_APP_ADMIN_USERNAME`: Build-time admin username (passed as Docker build argument)  
- `REACT_APP_ADMIN_PASSWORD`: Build-time admin password (passed as Docker build argument)
- `REACT_APP_SUPERADMIN_USERNAME`: Build-time superadmin username (passed as Docker build argument)
- `REACT_APP_SUPERADMIN_PASSWORD`: Build-time superadmin password (passed as Docker build argument)

### Role System

The application implements a two-tier role system:

1. **Admin Role**: 
   - Can access all reporting and viewing features
   - Cannot add new competitions or load competition data
   - Suitable for read-only users who need access to reports

2. **Superadmin Role**:
   - Full access to all features
   - Can add new competitions and load competition data  
   - Has all admin permissions plus write operations

### Security Notes

- Credentials are passed as build arguments (not stored in Dockerfile)
- Secrets are also stored in Fly.io for reference
- No default credentials in the Docker image
- Application will show error if credentials not properly configured
- User role is displayed in the navigation bar
- Navigation items are conditionally rendered based on user role

## Configuration Files

- `fly.toml`: Fly.io application configuration
- `Dockerfile`: Multi-stage build for production
- `src/config/api.ts`: API configuration and authentication
- `.env.example`: Template for environment variables