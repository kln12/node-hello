#!/bin/bash

# Financial Dashboard - Ubuntu Setup Script
# This script automates the installation and configuration of all required dependencies
# for running the Financial Dashboard application on Ubuntu Linux

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_error "Please do not run this script as root. Run as a regular user with sudo privileges."
    exit 1
fi

print_info "Starting Ubuntu setup for Financial Dashboard..."

# Update system packages
print_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required system packages
print_info "Installing required system packages..."
sudo apt install -y curl wget git build-essential software-properties-common

# Install Node.js 22.x
print_info "Installing Node.js 22.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
    print_info "Node.js installed: $(node --version)"
else
    print_info "Node.js already installed: $(node --version)"
fi

# Verify npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm manually."
    exit 1
fi
print_info "npm version: $(npm --version)"

# Install PM2 globally for process management
print_info "Installing PM2 process manager..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    print_info "PM2 installed successfully"
else
    print_info "PM2 already installed: $(pm2 --version)"
fi

# Install MariaDB Server
print_info "Installing MariaDB Server..."
if ! command -v mysql &> /dev/null; then
    sudo apt install -y mariadb-server mariadb-client
    
    # Start MariaDB service
    sudo systemctl start mariadb
    sudo systemctl enable mariadb
    
    print_info "MariaDB installed successfully"
    print_warning "Please run 'sudo mysql_secure_installation' to secure your MariaDB installation"
else
    print_info "MariaDB already installed"
fi

# Check MariaDB status
if sudo systemctl is-active --quiet mariadb; then
    print_info "MariaDB is running"
else
    print_warning "MariaDB is not running. Starting MariaDB..."
    sudo systemctl start mariadb
fi

# Install Nginx (optional but recommended)
print_info "Do you want to install Nginx as a reverse proxy? (y/n)"
read -r install_nginx
if [[ "$install_nginx" =~ ^[Yy]$ ]]; then
    if ! command -v nginx &> /dev/null; then
        sudo apt install -y nginx
        sudo systemctl start nginx
        sudo systemctl enable nginx
        print_info "Nginx installed and started"
    else
        print_info "Nginx already installed"
    fi
fi

# Configure firewall
print_info "Configuring firewall (UFW)..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 80/tcp    # HTTP
    sudo ufw allow 443/tcp   # HTTPS
    sudo ufw allow 3000/tcp  # Backend API
    sudo ufw allow 5173/tcp  # Vite dev server (optional)
    
    print_info "Firewall rules added. Enable UFW with: sudo ufw enable"
else
    print_warning "UFW not found. Please configure firewall manually."
fi

# Create application directory
print_info "Setting up application directory..."
APP_DIR="$HOME/financial-dashboard"
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
    print_info "Application directory created at: $APP_DIR"
else
    print_info "Application directory already exists at: $APP_DIR"
fi

# Database setup prompt
print_info ""
print_info "=========================================="
print_info "Database Setup Instructions"
print_info "=========================================="
print_info "1. Secure your MariaDB installation:"
print_info "   sudo mysql_secure_installation"
print_info ""
print_info "2. Create database and user:"
print_info "   sudo mysql -u root -p"
print_info "   Then run the following SQL commands:"
print_info "   CREATE DATABASE k_market;"
print_info "   CREATE USER 'k_market_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
print_info "   GRANT ALL PRIVILEGES ON k_market.* TO 'k_market_user'@'localhost';"
print_info "   FLUSH PRIVILEGES;"
print_info "   EXIT;"
print_info ""
print_info "3. Initialize database schema:"
print_info "   mysql -u k_market_user -p k_market < scripts/init-database.sql"
print_info ""
print_info "=========================================="

# Summary
print_info ""
print_info "=========================================="
print_info "Setup completed successfully!"
print_info "=========================================="
print_info "Installed components:"
print_info "  - Node.js: $(node --version)"
print_info "  - npm: $(npm --version)"
print_info "  - PM2: $(pm2 --version)"
print_info "  - MariaDB: $(mysql --version | head -n1)"
if command -v nginx &> /dev/null; then
    print_info "  - Nginx: $(nginx -v 2>&1)"
fi
print_info ""
print_info "Next steps:"
print_info "1. Clone your repository to: $APP_DIR"
print_info "2. Follow the database setup instructions above"
print_info "3. Configure environment variables (.env files)"
print_info "4. Run the deployment script: ./scripts/deploy.sh"
print_info ""
print_info "For detailed instructions, see DEPLOYMENT.md"
print_info "=========================================="
