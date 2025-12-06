# WMF Scraper Frontend

A React-based frontend for the World Minifootball Federation (WMF) scraper system.

## Features

- Competition data visualization and reporting
- Role-based access control
- Mobile-responsive design
- Secure authentication system

## Role System

The application supports two user roles:

### Admin Role
- Access to all viewing and reporting features
- Can view competition overalls, country rankings, competitor results, and penalties
- Cannot add new competitions or load competition data
- Ideal for users who need read-only access to reports

### Superadmin Role  
- Full access to all features
- Can add new competitions and load competition data
- Has all admin permissions plus write operations
- Required for data management tasks

## User Interface

- Clean Bootstrap-based responsive design
- Mobile-friendly navigation with hamburger menu
- Current user role displayed in navigation bar
- Conditional menu items based on user permissions

## Quick Start

### Development
```bash
npm install
npm start
```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Authentication

The application uses session-based authentication with role validation. Users must log in with valid credentials that match their assigned role (admin or superadmin).

## API Integration

- Secure API communication with Bearer token authentication
- Environment-based API endpoint configuration
- Automatic authentication header injection for all requests

## Project Structure

- `src/components/`: React components for UI
- `src/config/`: API configuration and settings
- `public/`: Static assets and HTML template
- `build/`: Production build output (generated)

For more information, see the [deployment documentation](./DEPLOYMENT.md).