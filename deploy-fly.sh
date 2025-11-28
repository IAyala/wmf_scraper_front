#!/bin/bash

# Fly.io Deployment Script for WMF Scraper Front
# This script helps deploy the WMF Scraper Front to Fly.io

set -e  # Exit on any error

# Check if API_KEY is provided as argument
if [ -z "$1" ]; then
    echo "Usage: $0 <API_KEY>"
    echo "Example: $0 your-secret-api-key-here"
    exit 1
fi

API_KEY="$1"

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

# Deploy application
deploy() {
    print_step "Deploying to Fly.io..."
    flyctl deploy --build-arg REACT_APP_API_KEY="$API_KEY"
    print_success "Deployment completed!"
}

# Show application info
show_info() {
    print_step "Application information:"
    flyctl status
    echo
    print_step "Your application is available at:"
    flyctl info --json | grep -o '"hostname":"[^"]*"' | cut -d'"' -f4 | sed 's/^/https:\/\//'
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
    
    deploy
    show_info
    
    print_success "🎉 WMF Scraper Front successfully deployed to Fly.io!"
}

# Parse command line arguments
case "${1:-deploy}" in
    "deploy"|"")
        main
        ;;
    "logs")
        flyctl logs
        ;;
    "status")
        flyctl status
        ;;
    "secrets")
        print_step "Current secrets:"
        flyctl secrets list
        ;;
    "scale")
        shift
        flyctl scale $@
        ;;
    "help"|"-h"|"--help")
        echo "WMF Scraper Fly.io Deployment Script"
        echo
        echo "Usage: $0 [command]"
        echo
        echo "Commands:"
        echo "  deploy (default)  Deploy the application"
        echo "  logs             Show application logs"
        echo "  status           Show application status"
        echo "  secrets          List current secrets"
        echo "  scale            Scale the application"
        echo "  help             Show this help message"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Run '$0 help' for usage information"
        exit 1
        ;;
esac
