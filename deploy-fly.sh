#!/bin/bash

# Fly.io Deployment Script for WMF Scraper Front
# This script helps deploy the WMF Scraper Front to Fly.io

set -e  # Exit on any error

# Check if required arguments are provided
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: $0 <API_KEY> <ADMIN_USERNAME> <ADMIN_PASSWORD>"
    echo "Example: $0 your-secret-api-key admin secure-password"
    exit 1
fi

API_KEY="$1"
ADMIN_USERNAME="$2"
ADMIN_PASSWORD="$3"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if flyctl is installed
check_flyctl() {
    print_step "Checking if flyctl is installed..."
    if ! command -v flyctl &> /dev/null; then
        print_error "flyctl is not installed"
        echo "Please install flyctl: https://fly.io/docs/hands-on/install-flyctl/"
        exit 1
    fi
    print_success "flyctl is installed"
}

# Check if user is logged in to Fly.io
check_login() {
    print_step "Checking Fly.io authentication..."
    if ! flyctl auth whoami &> /dev/null; then
        print_warning "Not logged in to Fly.io"
        print_step "Logging in to Fly.io..."
        flyctl auth login
    fi
    print_success "Authenticated with Fly.io"
}

# Set secrets
set_secrets() {
    print_step "Setting application secrets..."
    flyctl secrets set \
        API_KEY="$API_KEY" \
        ADMIN_USERNAME="$ADMIN_USERNAME" \
        ADMIN_PASSWORD="$ADMIN_PASSWORD"
    print_success "Secrets set successfully"
}

# Deploy application
deploy() {
    print_step "Deploying to Fly.io..."
    flyctl deploy \
        --build-arg REACT_APP_API_KEY="$API_KEY" \
        --build-arg REACT_APP_ADMIN_USERNAME="$ADMIN_USERNAME" \
        --build-arg REACT_APP_ADMIN_PASSWORD="$ADMIN_PASSWORD"
    print_success "Deployment completed!"
}

# Show application info
show_info() {
    print_step "Application information:"
    flyctl status
    echo
    print_step "Your application is available at:"
    echo "https://wmf-scraper-front.fly.dev/"
}

# Main deployment process
main() {
    echo "🚀 WMF Scraper Front - Fly.io Deployment"
    echo "=================================="
    echo
    
    check_flyctl
    check_login
    
    # Check if app exists, if not launch it
    if ! flyctl status &> /dev/null; then
        print_step "Creating new Fly.io application..."
        flyctl launch --no-deploy
    fi
    
    set_secrets
    deploy
    show_info
    
    print_success "🎉 WMF Scraper Front successfully deployed to Fly.io!"
}

# Main execution
main
