# Quick Start Guide - Ubuntu Deployment

This is a quick reference guide for deploying the Financial Dashboard on Ubuntu Linux.

## 🎯 Prerequisites

- Ubuntu 20.04 LTS or later
- Non-root user with sudo privileges
- Internet connection

## 🚀 Quick Deployment (5 Steps)

### Step 1: Clone Repository
```bash
git clone https://github.com/kln12/k_project.git
cd k_project
```

### Step 2: Run Setup Script
```bash
chmod +x scripts/setup-ubuntu.sh
./scripts/setup-ubuntu.sh
```

### Step 3: Secure MariaDB
```bash
sudo mysql_secure_installation
```
- Set root password: **Yes**
- Remove anonymous users: **Yes**
- Disallow root login remotely: **Yes**
- Remove test database: **Yes**

### Step 4: Setup Database
```bash
# Login to MariaDB
sudo mysql -u root -p

# Run these SQL commands:
CREATE DATABASE k_market;
CREATE USER 'k_market_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON k_market.* TO 'k_market_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Initialize database schema
mysql -u k_market_user -p k_market < scripts/init-database.sql
```

### Step 5: Configure and Deploy
```bash
# Copy environment templates
cp .env.production.example .env
cp backend/.env.production.example backend/.env

# Edit backend/.env with your database password
nano backend/.env
# Update: DB_PASSWORD=YourSecurePassword123!
# Update: JWT_SECRET=$(openssl rand -base64 32)

# Deploy application
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## ✅ Verify Deployment

```bash
# Check backend status
pm2 list

# View backend logs
pm2 logs financial-dashboard-backend

# Test backend API
curl http://localhost:3000

# Serve frontend (choose one option)
# Option 1: Using serve
npm install -g serve
serve -s dist -l 5000

# Option 2: Using PM2
pm2 serve dist 5000 --name financial-dashboard-frontend --spa
```

## 🌐 Access Application

- **Frontend**: http://your-server-ip:5000
- **Backend API**: http://your-server-ip:3000

## 📋 Common Commands

### PM2 Process Management
```bash
pm2 list                    # List all processes
pm2 logs                    # View all logs
pm2 restart backend         # Restart backend
pm2 stop backend            # Stop backend
pm2 monit                   # Monitor processes
```

### Database Management
```bash
# Backup database
mysqldump -u k_market_user -p k_market > backup.sql

# Restore database
mysql -u k_market_user -p k_market < backup.sql

# Access database
mysql -u k_market_user -p k_market
```

### Application Updates
```bash
# Pull latest changes
git pull origin main

# Redeploy
./scripts/deploy.sh
```

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check logs
pm2 logs financial-dashboard-backend --lines 50

# Verify database connection
mysql -u k_market_user -p k_market

# Check environment variables
cat backend/.env
```

### Port already in use
```bash
# Find process using port
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

### Database connection failed
```bash
# Check MariaDB status
sudo systemctl status mariadb

# Restart MariaDB
sudo systemctl restart mariadb

# Check credentials
mysql -u k_market_user -p
```

## 📚 Full Documentation

For detailed information, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **README.md** - Application documentation

## 🔐 Security Checklist

- [ ] Changed default database password
- [ ] Generated secure JWT secret
- [ ] Enabled firewall (ufw)
- [ ] Secured MariaDB installation
- [ ] Updated all system packages
- [ ] Configured HTTPS (for production)

## 🎉 Next Steps

1. **Setup Nginx** (recommended for production)
   - See DEPLOYMENT.md for Nginx configuration
   - Configure SSL with Let's Encrypt

2. **Configure Domain**
   - Point your domain to server IP
   - Update Nginx configuration
   - Obtain SSL certificate

3. **Setup Monitoring**
   - Configure PM2 monitoring
   - Setup log rotation
   - Configure backups

---

**Need Help?** Check DEPLOYMENT.md for detailed troubleshooting and configuration options.
