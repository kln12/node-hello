# Ubuntu Linux Deployment Guide

This guide provides comprehensive instructions for deploying the Financial Dashboard application on Ubuntu Linux.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Database Requirements](#database-requirements)
- [Quick Start](#quick-start)
- [Manual Installation](#manual-installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Process Management](#process-management)
- [Nginx Setup (Optional)](#nginx-setup-optional)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

---

## 📦 Prerequisites

### System Requirements

- **Operating System**: Ubuntu 20.04 LTS or later (22.04 LTS recommended)
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: Minimum 5GB free space
- **User**: Non-root user with sudo privileges

### Required Software

The following will be installed automatically by the setup script:

- **Node.js**: v22.x
- **npm**: Latest version (comes with Node.js)
- **MariaDB Server**: 10.11 or later
- **PM2**: Process manager for Node.js
- **Git**: For version control
- **Build tools**: gcc, g++, make

---

## 🗄️ Database Requirements

This application uses **MariaDB Server** (MySQL-compatible database).

### Why MariaDB?

- Open-source and free
- Drop-in replacement for MySQL
- Better performance and features
- Active development and community support

### Database Schema

The application requires the following tables:
- `users` - User authentication and profiles
- `notes` - User notes management
- `financial_data` - Financial transactions and data

All tables will be created automatically using the initialization script.

---

## 🚀 Quick Start

### Automated Setup (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kln12/k_project.git
   cd k_project
   ```

2. **Run the automated setup script**:
   ```bash
   chmod +x scripts/setup-ubuntu.sh
   ./scripts/setup-ubuntu.sh
   ```

   This script will:
   - Update system packages
   - Install Node.js 22.x
   - Install MariaDB Server
   - Install PM2 process manager
   - Configure firewall rules
   - Optionally install Nginx

3. **Secure MariaDB installation**:
   ```bash
   sudo mysql_secure_installation
   ```

   Follow the prompts:
   - Set root password: **Yes** (choose a strong password)
   - Remove anonymous users: **Yes**
   - Disallow root login remotely: **Yes**
   - Remove test database: **Yes**
   - Reload privilege tables: **Yes**

4. **Create database and user**:
   ```bash
   sudo mysql -u root -p
   ```

   Run the following SQL commands:
   ```sql
   CREATE DATABASE k_market;
   CREATE USER 'k_market_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON k_market.* TO 'k_market_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. **Initialize database schema**:
   ```bash
   mysql -u k_market_user -p k_market < scripts/init-database.sql
   ```

6. **Configure environment variables** (see [Configuration](#configuration) section)

7. **Deploy the application**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

---

## 🔧 Manual Installation

If you prefer to install components manually:

### 1. Install Node.js 22.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v22.x.x
npm --version
```

### 2. Install MariaDB Server

```bash
# Update package list
sudo apt update

# Install MariaDB
sudo apt install -y mariadb-server mariadb-client

# Start and enable MariaDB
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Verify installation
sudo systemctl status mariadb
mysql --version
```

### 3. Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### 4. Install Build Tools

```bash
sudo apt install -y build-essential git curl wget
```

### 5. Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw allow 3000/tcp # Backend API

# Enable firewall (if not already enabled)
sudo ufw enable

# Check status
sudo ufw status
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create `/backend/.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=k_market_user
DB_PASSWORD=your_secure_password
DB_NAME=k_market
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_very_secure_random_jwt_secret_key_here

# Server Configuration
PORT=3000
NODE_ENV=production
```

**Important**: 
- Replace `your_secure_password` with your actual database password
- Generate a strong JWT secret: `openssl rand -base64 32`

### Frontend Environment Variables

Create `/.env` file in project root:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Supabase Configuration (if using Supabase features)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Environment Templates

Example files are provided:
- `.env.production.example` - Frontend template
- `backend/.env.production.example` - Backend template

Copy and customize these templates:

```bash
# Frontend
cp .env.production.example .env

# Backend
cp backend/.env.production.example backend/.env
```

---

## 🚢 Deployment

### Using the Deployment Script

The easiest way to deploy:

```bash
./scripts/deploy.sh
```

This script will:
1. Check environment configuration
2. Install frontend dependencies
3. Build frontend application
4. Install backend dependencies
5. Start backend with PM2
6. Configure PM2 for auto-start on boot
7. Display deployment status

### Manual Deployment

If you prefer manual deployment:

#### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

#### 2. Build Frontend

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

#### 3. Start Backend with PM2

```bash
# Using ecosystem config (recommended)
pm2 start ecosystem.config.js

# Or directly
cd backend
pm2 start index.ts --name financial-dashboard-backend --interpreter ts-node

# Save PM2 process list
pm2 save

# Configure PM2 to start on boot
pm2 startup
# Run the command that PM2 outputs
```

#### 4. Serve Frontend

**Option A: Using serve (simple)**
```bash
npm install -g serve
serve -s dist -l 5000
```

**Option B: Using PM2**
```bash
pm2 serve dist 5000 --name financial-dashboard-frontend --spa
pm2 save
```

**Option C: Using Nginx (recommended for production)**
See [Nginx Setup](#nginx-setup-optional) section below.

---

## 🔄 Process Management

### PM2 Commands

```bash
# List all processes
pm2 list

# View logs
pm2 logs                              # All processes
pm2 logs financial-dashboard-backend  # Specific process

# Restart processes
pm2 restart financial-dashboard-backend
pm2 restart all

# Stop processes
pm2 stop financial-dashboard-backend
pm2 stop all

# Delete processes
pm2 delete financial-dashboard-backend

# Monitor processes
pm2 monit

# Save current process list
pm2 save

# Resurrect saved processes
pm2 resurrect
```

### PM2 Ecosystem Configuration

The `ecosystem.config.js` file provides advanced PM2 configuration:

```javascript
module.exports = {
  apps: [{
    name: 'financial-dashboard-backend',
    script: './backend/index.ts',
    interpreter: 'ts-node',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

---

## 🌐 Nginx Setup (Optional)

Nginx provides better performance and features for production deployments.

### 1. Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Configure Nginx

Create configuration file:

```bash
sudo nano /etc/nginx/sites-available/financial-dashboard
```

Add the following configuration (also available in `nginx.conf.example`):

```nginx
server {
    listen 80;
    server_name your_domain.com;  # Replace with your domain or IP

    # Frontend
    location / {
        root /path/to/project/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 3. Enable Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/financial-dashboard /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. SSL/HTTPS with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your_domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Backend cannot connect to database

**Solutions**:
```bash
# Check MariaDB status
sudo systemctl status mariadb

# Restart MariaDB
sudo systemctl restart mariadb

# Check database credentials
mysql -u k_market_user -p k_market

# View MariaDB logs
sudo tail -f /var/log/mysql/error.log
```

### Backend Not Starting

**Problem**: PM2 shows backend as errored

**Solutions**:
```bash
# View detailed logs
pm2 logs financial-dashboard-backend --lines 100

# Check environment variables
cat backend/.env

# Test backend manually
cd backend
npm start

# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Problem**: Port 3000 is already in use

**Solutions**:
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change port in backend/.env
# PORT=3001
```

### Frontend Build Fails

**Problem**: `npm run build` fails

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check Node.js version
node --version  # Should be v22.x

# Build with verbose output
npm run build -- --debug
```

### Permission Issues

**Problem**: Permission denied errors

**Solutions**:
```bash
# Fix ownership of project directory
sudo chown -R $USER:$USER /path/to/project

# Fix npm permissions
sudo chown -R $USER:$USER ~/.npm

# Make scripts executable
chmod +x scripts/*.sh
```

---

## 🔧 Maintenance

### Regular Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js packages
npm update
cd backend && npm update

# Update PM2
sudo npm update -g pm2
```

### Database Backup

```bash
# Backup database
mysqldump -u k_market_user -p k_market > backup_$(date +%Y%m%d).sql

# Restore database
mysql -u k_market_user -p k_market < backup_20240101.sql
```

### Log Management

```bash
# View PM2 logs
pm2 logs

# Clear PM2 logs
pm2 flush

# Rotate logs
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Monitoring

```bash
# Monitor processes
pm2 monit

# Check system resources
htop

# Check disk space
df -h

# Check memory usage
free -h
```

---

## 📊 Performance Optimization

### Enable Gzip Compression (Nginx)

Add to Nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### PM2 Cluster Mode

For better performance, use cluster mode:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'financial-dashboard-backend',
    script: './backend/index.ts',
    instances: 'max',  // Use all CPU cores
    exec_mode: 'cluster'
  }]
};
```

---

## 🔐 Security Best Practices

1. **Use strong passwords** for database and JWT secret
2. **Enable firewall** and only open necessary ports
3. **Keep system updated** regularly
4. **Use HTTPS** in production (Let's Encrypt)
5. **Restrict database access** to localhost only
6. **Use environment variables** for sensitive data
7. **Regular backups** of database and application
8. **Monitor logs** for suspicious activity

---

## 📞 Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review PM2 logs: `pm2 logs`
- Check system logs: `sudo journalctl -xe`
- Open an issue on GitHub

---

## 📝 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MariaDB Documentation](https://mariadb.com/kb/en/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

---

**Last Updated**: November 2025
