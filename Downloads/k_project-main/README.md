# Financial Dashboard Application

A comprehensive full-stack financial management dashboard built with React, TypeScript, and Node.js. This application provides various financial tools including calculators, currency conversion, money tracking, notes management, and more.

## 🚀 Features

- **User Authentication**: Secure login system with JWT tokens
- **Currency Converter**: Real-time currency conversion
- **Interest Calculator**: Calculate compound and simple interest
- **Basic Calculator**: Standard mathematical operations
- **Money Graph**: Visualize financial data with interactive charts
- **Notes Manager**: Create and manage financial notes
- **World Clock**: Track time across different time zones
- **Financial Terms Dictionary**: Quick reference for financial terminology
- **Calendar Integration**: Built-in calendar for date tracking

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Chart.js** with react-chartjs-2 for data visualization
- **Supabase** for backend services
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript**
- **MariaDB** database
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v22 or higher)
- **MariaDB Server** (10.11 or higher) - for production deployment
- **Docker** and **Docker Compose** (optional, for containerized deployment)
- **npm** or **yarn** package manager

## 🐧 Ubuntu Linux Deployment

For production deployment on Ubuntu Linux, we provide automated scripts and comprehensive documentation:

### Quick Deployment
```bash
# Run automated setup
./scripts/setup-ubuntu.sh

# Configure database and deploy
./scripts/deploy.sh
```

### Documentation
- **[QUICK_START.md](QUICK_START.md)** - 5-step quick deployment guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete Ubuntu deployment documentation

### What Gets Installed
- Node.js 22.x
- MariaDB Server
- PM2 Process Manager
- Nginx (optional)
- Required system dependencies

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/kln12/k_project.git
cd k_project
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3001
```

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## 🚀 Running the Application

### Option 1: Using Docker Compose (Recommended)

This will start the frontend, backend, and database services:

```bash
docker-compose up
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:3306

### Option 2: Manual Setup

#### Start the Database
Ensure MariaDB is running locally or use Docker:
```bash
docker run -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e MYSQL_DATABASE=your_database \
  -p 3306:3306 \
  mariadb:10.11
```

#### Start the Backend
```bash
cd backend
npm run dev
```

#### Start the Frontend
```bash
npm run dev
```

## 📦 Build for Production

### Frontend Build
```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Backend Build
```bash
cd backend
npm run start
```

## 🧪 Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server

## 📁 Project Structure

```
.
├── backend/                 # Backend Node.js/Express application
│   ├── services/           # Business logic and services
│   ├── index.ts            # Main backend entry point
│   ├── package.json        # Backend dependencies
│   └── Dockerfile          # Backend Docker configuration
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components
│   │   ├── money-graph/   # Money graph visualization
│   │   ├── notes/         # Notes management
│   │   ├── terms/         # Financial terms dictionary
│   │   └── worldclock/    # World clock component
│   ├── config/            # Configuration files
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Application entry point
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔐 API Endpoints

### Authentication
- `POST /api/login` - Authenticate user with email and password
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Additional Endpoints
(Add more endpoints as they are implemented in your backend)

## 🎨 Features Overview

### Dashboard
The main dashboard provides a unified view of all financial tools and widgets. Users can:
- Toggle calendar visibility
- Toggle financial terms dictionary
- Access all calculators and tools
- Manage notes and track finances

### Currency Converter
Convert between different currencies with real-time exchange rates.

### Interest Calculator
Calculate both simple and compound interest for financial planning.

### Money Graph
Visualize financial data with interactive charts powered by Chart.js.

### Notes Manager
Create, edit, and organize financial notes and reminders.

### World Clock
Track time across multiple time zones for international financial operations.

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MariaDB is running and accessible
- Verify database credentials in `.env` files
- Check if port 3306 is not being used by another service

### Docker Issues
- Run `docker-compose down` and then `docker-compose up --build` to rebuild containers
- Check Docker logs: `docker-compose logs -f`

### Frontend Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Backend Issues
- Ensure all environment variables are set correctly
- Check backend logs for specific error messages
- Verify database migrations have run successfully

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint for code linting: `npm run lint`
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **kln12** - [GitHub Profile](https://github.com/kln12)

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS for the styling framework
- Chart.js for data visualization
- Supabase for backend services
- All contributors and users of this project

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Note**: This is a development project. Ensure you change default passwords and secrets before deploying to production.
