#!/bin/bash

# Financial Dashboard - Deployment Script
# This script handles the deployment of both frontend and backend applications

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

print_info "Starting deployment process..."
print_info "Project root: $PROJECT_ROOT"

# Check if .env files exist
print_step "Checking environment configuration..."
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    print_error "Frontend .env file not found!"
    print_warning "Please create .env file in the project root. See .env.production.example"
    exit 1
fi

if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
    print_error "Backend .env file not found!"
    print_warning "Please create .env file in backend directory. See backend/.env.production.example"
    exit 1
fi

print_info "Environment files found"

# Install frontend dependencies
print_step "Installing frontend dependencies..."
cd "$PROJECT_ROOT"
npm install

# Build frontend
print_step "Building frontend application..."
npm run build

if [ ! -d "$PROJECT_ROOT/dist" ]; then
    print_error "Frontend build failed! dist directory not found."
    exit 1
fi

print_info "Frontend built successfully"

# Install backend dependencies
print_step "Installing backend dependencies..."
cd "$PROJECT_ROOT/backend"
npm install

# Check if backend TypeScript compiles
print_step "Checking backend TypeScript compilation..."
if command -v tsc &> /dev/null; then
    npx tsc --noEmit || print_warning "TypeScript compilation check failed, but continuing..."
fi

# Stop existing PM2 processes
print_step "Stopping existing PM2 processes..."
pm2 stop financial-dashboard-backend 2>/dev/null || print_info "No existing backend process to stop"
pm2 delete financial-dashboard-backend 2>/dev/null || true

# Start backend with PM2
print_step "Starting backend with PM2..."
cd "$PROJECT_ROOT"
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    # Fallback to direct PM2 start
    cd "$PROJECT_ROOT/backend"
    pm2 start index.ts --name financial-dashboard-backend --interpreter ts-node
fi

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
print_step "Configuring PM2 startup..."
pm2 startup | grep -v "PM2" | sudo bash || print_warning "PM2 startup configuration may need manual setup"

# Display PM2 status
print_step "Current PM2 processes:"
pm2 list

# Test backend health
print_step "Testing backend health..."
sleep 3  # Wait for backend to start

BACKEND_PORT=$(grep "PORT=" "$PROJECT_ROOT/backend/.env" | cut -d '=' -f2 || echo "3000")
if curl -s "http://localhost:$BACKEND_PORT" > /dev/null 2>&1; then
    print_info "Backend is responding on port $BACKEND_PORT"
else
    print_warning "Backend health check failed. Check PM2 logs: pm2 logs financial-dashboard-backend"
fi

# Instructions for serving frontend
print_step "Frontend deployment options:"
echo ""
echo "Option 1: Serve with a static file server (recommended for production)"
echo "  Install serve: npm install -g serve"
echo "  Run: serve -s dist -l 5000"
echo ""
echo "Option 2: Use Nginx (recommended for production)"
echo "  Copy nginx.conf.example to /etc/nginx/sites-available/"
echo "  Create symbolic link to sites-enabled"
echo "  Restart Nginx: sudo systemctl restart nginx"
echo ""
echo "Option 3: Use PM2 to serve static files"
echo "  pm2 serve dist 5000 --name financial-dashboard-frontend --spa"
echo ""

# Summary
print_info ""
print_info "=========================================="
print_info "Deployment completed successfully!"
print_info "=========================================="
print_info "Backend: Running on port $BACKEND_PORT (managed by PM2)"
print_info "Frontend: Built files in dist/ directory"
print_info ""
print_info "Useful PM2 commands:"
print_info "  pm2 list                    - List all processes"
print_info "  pm2 logs                    - View all logs"
print_info "  pm2 logs backend            - View backend logs"
print_info "  pm2 restart backend         - Restart backend"
print_info "  pm2 stop backend            - Stop backend"
print_info "  pm2 monit                   - Monitor processes"
print_info ""
print_info "To view backend logs:"
print_info "  pm2 logs financial-dashboard-backend"
print_info ""
print_info "=========================================="
