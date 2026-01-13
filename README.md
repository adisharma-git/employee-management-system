# Employee Management System (EMS)

<div align="center">

![EMS Logo](https://via.placeholder.com/150x150?text=EMS)

**A full-stack, cloud-hosted employee management system with role-based access control**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing) • [Team](#-team)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

The Employee Management System (EMS) is a comprehensive web application designed to streamline employee data management, attendance tracking, leave management, and task assignment. Built with modern web technologies and deployed on free-tier cloud services, EMS provides a robust solution for small to medium-sized organizations.

### 🎨 Key Highlights

- **Role-Based Access Control (RBAC)**: Three distinct user roles (Admin, Manager, Employee) with granular permissions
- **Real-time Analytics**: Interactive dashboards with charts and statistics
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Cloud-Native**: Deployed on free-tier cloud services (Vercel, Render, Supabase)
- **RESTful API**: Well-documented API with consistent response formats

### 📊 Project Stats

- **Development Timeline**: 20 Days (January 13 - February 7, 2026)
- **Team Size**: 4 Developers
- **Total Components**: 50+ React components
- **API Endpoints**: 21 REST endpoints
- **Database Tables**: 5 PostgreSQL tables
- **Test Coverage**: 80%+ for critical paths

---

## ✨ Features

### 👨‍💼 Admin Features

- **📊 Advanced Dashboard**
  - Real-time statistics and KPIs
  - Department-wise breakdown
  - Attendance trends visualization
  - Task completion analytics

- **👥 Employee Management**
  - Complete CRUD operations
  - Advanced search and filtering
  - Bulk operations support
  - Employee profile management

- **📅 Attendance Management**
  - Comprehensive attendance reports
  - Export to CSV/PDF
  - Custom date range filtering
  - Department-wise analysis

- **🏖️ Leave Management**
  - Approve/reject leave requests
  - Leave balance tracking
  - Leave history and analytics
  - Policy configuration

- **✅ Task Management**
  - Assign tasks to employees
  - Track task progress
  - Priority management
  - Deadline tracking

- **📈 Analytics & Reports**
  - Interactive charts (Line, Bar, Pie)
  - Performance metrics
  - Attendance patterns
  - Custom report generation

### 👔 Manager Features

- **📊 Team Dashboard**
  - Team performance overview
  - Quick action buttons
  - Pending approvals summary

- **👥 Team Management**
  - View team members
  - Update team member details
  - Performance tracking

- **🏖️ Leave Approvals**
  - Review leave requests
  - One-click approve/reject
  - Leave balance verification
  - Email notifications

- **✅ Task Assignment**
  - Create and assign tasks
  - Monitor task progress
  - Update priorities
  - Task completion tracking

### 👤 Employee Features

- **📊 Personal Dashboard**
  - Quick stats overview
  - Recent activity feed
  - Upcoming tasks
  - Leave balance

- **📅 Attendance**
  - Mark daily attendance
  - View attendance history
  - Monthly attendance calendar
  - Attendance statistics

- **🏖️ Leave Requests**
  - Request new leaves
  - Track request status
  - View leave history
  - Check leave balance

- **✅ My Tasks**
  - View assigned tasks
  - Update task status
  - Track deadlines
  - Task history

- **👤 Profile Management**
  - Update personal information
  - Change password
  - Notification preferences

---

## 🎬 Demo

### Live Application

- **Frontend**: [https://ems-demo.vercel.app](https://ems-demo.vercel.app) *(Replace with actual URL)*
- **API**: [https://ems-api.render.com](https://ems-api.render.com) *(Replace with actual URL)*

### Demo Credentials

**Admin Account:**
```
Email: admin@ems.com
Password: Admin@123
```

**Manager Account:**
```
Email: manager@ems.com
Password: Manager@123
```

**Employee Account:**
```
Email: employee@ems.com
Password: Employee@123
```

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x450?text=Admin+Dashboard)

#### Employee List
![Employee List](https://via.placeholder.com/800x450?text=Employee+List)

#### Attendance Calendar
![Attendance Calendar](https://via.placeholder.com/800x450?text=Attendance+Calendar)

#### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x450?text=Analytics+Dashboard)

</details>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **Vite** | 5.0.0 | Build tool & dev server |
| **React Router** | 6.20.0 | Client-side routing |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Recharts** | 2.10.0 | Chart library |
| **Axios** | 1.6.0 | HTTP client |
| **React Context** | - | State management |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18.0 | Web framework |
| **Prisma** | 5.7.0 | ORM for database |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt** | 5.1.1 | Password hashing |
| **Express Validator** | 7.0.0 | Input validation |
| **Helmet** | 7.1.0 | Security middleware |
| **Morgan** | 1.10.0 | HTTP request logger |
| **CORS** | 2.8.5 | Cross-origin resource sharing |

### Database

| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary database |
| **Supabase** | Database hosting (free tier) |
| **Prisma Migrate** | Database migrations |

### DevOps & Deployment

| Service | Purpose | Tier |
|---------|---------|------|
| **Vercel** | Frontend hosting | Free |
| **Render** | Backend hosting | Free |
| **Supabase** | Database hosting | Free |
| **GitHub** | Version control | Free |
| **GitHub Actions** | CI/CD (optional) | Free |

### Development Tools

- **Git** - Version control
- **VS Code** - Code editor
- **Postman** - API testing
- **Prisma Studio** - Database GUI
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           React SPA (Vercel)                         │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Pages     │  │  Components  │  │   Context  │ │  │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS / REST API
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      API LAYER (Render)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Express.js Server                          │  │
│  │  ┌─────────┐  ┌────────────┐  ┌─────────────────┐  │  │
│  │  │ Routes  │→ │Controllers │→ │    Services     │  │  │
│  │  └─────────┘  └────────────┘  └─────────────────┘  │  │
│  │  ┌─────────┐  ┌────────────┐                        │  │
│  │  │Middleware  │ Validators │                        │  │
│  │  └─────────┘  └────────────┘                        │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ Prisma ORM
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                  DATABASE LAYER (Supabase)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                     │  │
│  │  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │  │
│  │  │ Users  │ │Employees │ │Attendance│ │ Leaves  │ │  │
│  │  └────────┘ └──────────┘ └──────────┘ └─────────┘ │  │
│  │                  ┌─────────┐                        │  │
│  │                  │  Tasks  │                        │  │
│  │                  └─────────┘                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → React Component → API Call (Axios) 
           → Express Route → Controller → Service 
           → Prisma → PostgreSQL → Response
           → Service → Controller → Express 
           → React Component → UI Update
```

### Authentication Flow

```
1. User Login → POST /api/auth/login
2. Backend validates credentials
3. JWT token generated and sent
4. Frontend stores token in Context
5. Token sent in Authorization header for protected routes
6. Backend validates token via middleware
7. Request proceeds if valid, 401 if invalid
```

---

## 📥 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL** (via Supabase account) - [Sign up](https://supabase.com/)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Setup environment variables (see Configuration section)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 5. Configure database
cd backend
npx prisma migrate dev
npx prisma db seed

# 6. Start development servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Detailed Installation Steps

<details>
<summary>Click to expand detailed steps</summary>

#### Step 1: Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system
```

#### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Install development dependencies
npm install --save-dev nodemon

# Verify installation
npm list
```

#### Step 3: Database Setup

```bash
# Create Supabase account at https://supabase.com
# Create a new project
# Copy the connection string

# Create .env file
cp .env.example .env

# Edit .env and add your database URL
# DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

#### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add API URL
# VITE_API_URL=http://localhost:5000/api
```

#### Step 5: Start Development Servers

```bash
# Terminal 1 - Start backend (from backend directory)
npm run dev
# Backend running on http://localhost:5000

# Terminal 2 - Start frontend (from frontend directory)
npm run dev
# Frontend running on http://localhost:5173
```

#### Step 6: Verify Installation

1. Open http://localhost:5173 in your browser
2. You should see the login page
3. Use demo credentials to login
4. Check browser console for any errors
5. Check terminal for backend logs

</details>

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` file:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@host:port/database"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL="http://localhost:5173"
ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
```

### Production Environment Variables

<details>
<summary>Click to see production configuration</summary>

**Backend (Render):**
```env
DATABASE_URL="your-supabase-production-url"
JWT_SECRET="production-secret-key"
NODE_ENV=production
FRONTEND_URL="https://your-app.vercel.app"
PORT=5000
```

**Frontend (Vercel):**
```env
VITE_API_URL=https://your-api.render.com/api
VITE_NODE_ENV=production
```

</details>

### Configuration Files

**Backend - package.json scripts:**
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

**Frontend - package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 🚀 Usage

### Accessing the Application

1. **Start the application** (if not already running):
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

3. **Login** with demo credentials (see Demo section)

### User Workflows

#### As an Admin

1. **View Dashboard**: See system-wide statistics
2. **Manage Employees**: Add, edit, or remove employees
3. **Review Attendance**: Check attendance reports
4. **Approve Leaves**: Process leave requests
5. **Assign Tasks**: Distribute work to team members
6. **Generate Reports**: Export analytics and reports

#### As a Manager

1. **View Team Dashboard**: Monitor team performance
2. **Approve/Reject Leaves**: Process team leave requests
3. **Assign Tasks**: Create and assign tasks to team
4. **Monitor Progress**: Track task completion
5. **View Team Attendance**: Check team attendance

#### As an Employee

1. **View Dashboard**: See personal stats
2. **Mark Attendance**: Record daily attendance
3. **Request Leave**: Submit leave applications
4. **View Tasks**: Check assigned tasks
5. **Update Task Status**: Mark tasks as complete
6. **Update Profile**: Manage personal information

### API Usage

#### Authentication

```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "role": "employee"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'

# Get current user
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Employees

```bash
# Get all employees
curl http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create employee
curl -X POST http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "name": "John Doe",
    "department": "Engineering",
    "designation": "Developer"
  }'
```

For complete API documentation, see [API Documentation](#-api-documentation).

---

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-api.render.com/api`

### Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

**Header:**
```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints Summary

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| GET | `/auth/me` | Get current user | Authenticated |
| GET | `/employees` | List employees | Authenticated |
| POST | `/employees` | Create employee | Admin |
| GET | `/employees/:id` | Get employee | Authenticated |
| PUT | `/employees/:id` | Update employee | Admin, Manager |
| DELETE | `/employees/:id` | Delete employee | Admin |
| POST | `/attendance/mark` | Mark attendance | Authenticated |
| GET | `/attendance/my` | Get my attendance | Authenticated |
| GET | `/attendance/report` | Attendance report | Admin |
| POST | `/leaves/request` | Request leave | Authenticated |
| GET | `/leaves/my` | Get my leaves | Authenticated |
| GET | `/leaves/pending` | Pending leaves | Manager, Admin |
| PUT | `/leaves/:id/approve` | Approve leave | Manager, Admin |
| PUT | `/leaves/:id/reject` | Reject leave | Manager, Admin |
| POST | `/tasks/assign` | Assign task | Manager, Admin |
| GET | `/tasks/my` | Get my tasks | Authenticated |
| GET | `/tasks/all` | Get all tasks | Manager, Admin |
| PUT | `/tasks/:id` | Update task | Authenticated |
| DELETE | `/tasks/:id` | Delete task | Manager, Admin |
| GET | `/analytics/dashboard` | Dashboard stats | Admin |
| GET | `/analytics/attendance` | Attendance analytics | Admin, Manager |
| GET | `/analytics/tasks` | Task analytics | Admin, Manager |

### Detailed API Documentation

For complete API documentation with request/response examples, see:
- [API Contracts Documentation](docs/api-contracts.md)
- [Technical Specifications](docs/EMS_Technical_Specifications.md)
- **Swagger UI**: `http://localhost:5000/api-docs` (when backend is running)

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Optional validation errors
  ]
}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## 📁 Project Structure

```
employee-management-system/
├── backend/                    # Backend application
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── employeeController.js
│   │   │   ├── attendanceController.js
│   │   │   ├── leaveController.js
│   │   │   ├── taskController.js
│   │   │   └── analyticsController.js
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── auth.js       # JWT authentication
│   │   │   ├── rbac.js       # Role-based access control
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── validator.js
│   │   ├── routes/           # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── attendanceRoutes.js
│   │   │   ├── leaveRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   ├── services/         # Business logic
│   │   │   ├── authService.js
│   │   │   ├── employeeService.js
│   │   │   └── emailService.js
│   │   ├── utils/            # Helper functions
│   │   │   ├── jwt.js
│   │   │   ├── password.js
│   │   │   └── validators.js
│   │   ├── config/           # Configuration
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   └── server.js         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── migrations/       # Database migrations
│   │   └── seed.js          # Seed data
│   ├── tests/               # Backend tests
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example         # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/                # Frontend application
│   ├── public/             # Static assets
│   │   ├── index.html
│   │   └── assets/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── common/    # Reusable components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── layout/    # Layout components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── PageLayout.jsx
│   │   │   ├── forms/     # Form components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── EmployeeForm.jsx
│   │   │   │   └── LeaveForm.jsx
│   │   │   ├── tables/    # Table components
│   │   │   │   ├── EmployeeTable.jsx
│   │   │   │   ├── AttendanceTable.jsx
│   │   │   │   └── Pagination.jsx
│   │   │   ├── charts/    # Chart components
│   │   │   │   ├── LineChart.jsx
│   │   │   │   ├── BarChart.jsx
│   │   │   │   └── PieChart.jsx
│   │   │   └── badges/    # Badge components
│   │   │       ├── StatusBadge.jsx
│   │   │       └── PriorityBadge.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   ├── EmployeeListPage.jsx
│   │   │   ├── EmployeeDetailsPage.jsx
│   │   │   ├── AttendancePage.jsx
│   │   │   ├── LeavesPage.jsx
│   │   │   ├── TasksPage.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   ├── context/       # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/      # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── employeeService.js
│   │   │   └── attendanceService.js
│   │   ├── utils/         # Utility functions
│   │   │   ├── helpers.js
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   └── useDebounce.js
│   │   ├── styles/        # Global styles
│   │   │   └── index.css
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── tests/             # Frontend tests
│   │   ├── components/
│   │   └── pages/
│   ├── .env.example       # Environment variables template
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── docs/                  # Project documentation
│   ├── architecture.md
│   ├── api-contracts.md
│   ├── database-schema.md
│   ├── setup-guide.md
│   ├── deployment.md
│   ├── contribution-guide.md
│   ├── github-setup-guide.md
│   └── technical-specifications.md
│
├── .gitignore            # Git ignore rules
├── .env.example          # Root environment template
├── LICENSE               # Project license
├── README.md            # This file
└── package.json         # Root package.json (optional)
```

---

## 💻 Development Workflow

### Daily Workflow

#### Morning (9:00 AM - 9:30 AM)

```bash
# 1. Attend daily standup (9:00-9:15 AM)

# 2. Update local repository
git checkout develop
git pull origin develop

# 3. Check assigned issues on GitHub
```

#### During Development (9:30 AM - 5:00 PM)

```bash
# 1. Create/switch to feature branch
git checkout -b feature/your-feature-name

# 2. Make changes and commit regularly
git add .
git commit -m "feat: add feature description"

# 3. Push to remote periodically
git push origin feature/your-feature-name

# 4. Update task status on GitHub Projects
```

#### End of Day (4:30 PM - 5:00 PM)

```bash
# 1. Commit all work
git add .
git commit -m "feat: end of day commit"

# 2. Push to remote
git push origin feature/your-feature-name

# 3. Update GitHub Projects
# 4. Post daily update in team chat
# 5. Review any assigned PRs
```

### Branch Strategy

```
main (production)
  ├── develop (integration)
  │   ├── feature/authentication
  │   ├── feature/employee-management
  │   ├── feature/attendance-tracking
  │   └── feature/leave-management
  └── hotfix/critical-bug (if needed)
```

### Git Workflow

```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature

# Make changes
git add .
git commit -m "feat: description"

# Push changes
git push origin feature/your-feature

# Create Pull Request on GitHub
# After approval and merge, cleanup
git checkout develop
git pull origin develop
git branch -d feature/your-feature
```

For detailed contribution guidelines, see [CONTRIBUTING.md](docs/contribution-guide.md).

---

## 🧪 Testing

### Running Tests

**Backend Tests:**
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test authController.test.js
```

**Frontend Tests:**
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test LoginPage.test.jsx
```

### Test Coverage

Current test coverage:

| Category | Coverage |
|----------|----------|
| Backend Controllers | 85% |
| Backend Services | 90% |
| Backend Middleware | 95% |
| Frontend Components | 75% |
| Frontend Pages | 70% |
| Overall | 80% |

### Writing Tests

**Backend Test Example:**
```javascript
describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test123!',
        role: 'employee'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

**Frontend Test Example:**
```javascript
describe('LoginPage', () => {
  it('should render login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
```

---

## 🚢 Deployment

### Deployment Architecture

```
Frontend (Vercel) → Backend (Render) → Database (Supabase)
```

### Prerequisites for Deployment

- [ ] Vercel account
- [ ] Render account
- [ ] Supabase production database
- [ ] GitHub repository

### Backend Deployment (Render)

<details>
<summary>Click to see backend deployment steps</summary>

#### Step 1: Prepare Backend for Deployment

```bash
# Ensure package.json has correct scripts
{
  "scripts": {
    "start": "node src/server.js",
    "build": "npx prisma generate"
  }
}
```

#### Step 2: Create render.yaml

```yaml
services:
  - type: web
    name: ems-backend
    env: node
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

#### Step 3: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: ems-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
5. Add environment variables
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Get backend URL: `https://ems-backend.onrender.com`

</details>

### Frontend Deployment (Vercel)

<details>
<summary>Click to see frontend deployment steps</summary>

#### Step 1: Prepare Frontend for Deployment

```bash
# Update .env.production
VITE_API_URL=https://your-backend.onrender.com/api
```

#### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable: `VITE_API_URL`
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Get frontend URL: `https://your-app.vercel.app`

</details>

### Database Migration (Production)

```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Verify migrations
DATABASE_URL="your-production-url" npx prisma db pull
```

### Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] SSL/HTTPS working
- [ ] Test all critical user flows
- [ ] Monitor logs for errors
- [ ] Setup error tracking (Sentry, optional)
- [ ] Setup uptime monitoring (UptimeRobot, optional)

### Deployment URLs

- **Production Frontend**: https://your-app.vercel.app
- **Production API**: https://your-api.onrender.com
- **Database**: Supabase (managed)

For detailed deployment guide, see [Deployment Documentation](docs/deployment.md).

---

## 👥 Team

### Development Team

| Role | Name | GitHub | Responsibilities |
|------|------|--------|------------------|
| **Database Developer** | [Name] | [@username](https://github.com/username) | Supabase, Prisma, Schema Design, Query Optimization |
| **Backend Developer** | [Name] | [@username](https://github.com/username) | Express APIs, Authentication, Business Logic, Deployment |
| **Frontend Developer 1** | [Name] | [@username](https://github.com/username) | Auth UI, Routing, Core Layouts, State Management |
| **Frontend Developer 2** | [Name] | [@username](https://github.com/username) | Feature UIs, Components Library, Analytics, Charts |

### Project Timeline

- **Start Date**: January 13, 2026
- **End Date**: February 7, 2026
- **Duration**: 20 Days
- **Status**: ✅ Completed (or 🚧 In Progress)

### Project Milestones

- ✅ **Week 1**: Foundation & Authentication
- ✅ **Week 2**: Core APIs & Features
- ✅ **Week 3**: Advanced Features & Integration
- ✅ **Week 4**: Testing, Deployment & Documentation

---

## 🤝 Contributing

We welcome contributions to the Employee Management System! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the [Contribution Guide](docs/contribution-guide.md)
- Write clear commit messages
- Add tests for new features
- Update documentation
- Follow code style guidelines
- Be respectful and constructive

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on what's best for the project
- Show empathy towards others

### Reporting Issues

Found a bug? Have a feature request?

1. Check if issue already exists
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if applicable)

### Security Issues

**DO NOT** create public issues for security vulnerabilities.

Instead, email: security@yourcompany.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 EMS Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💬 Support

### Get Help

- 📖 **Documentation**: Check the [docs](docs/) folder
- 💬 **Discussions**: [GitHub Discussions](https://github.com/YOUR-USERNAME/employee-management-system/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/YOUR-USERNAME/employee-management-system/issues)
- 📧 **Email**: support@yourcompany.com

### FAQ

<details>
<summary><strong>Q: How do I reset my password?</strong></summary>

A: Password reset functionality is coming in v2.0. For now, contact your admin.
</details>

<details>
<summary><strong>Q: Can I use this project for commercial purposes?</strong></summary>

A: Yes! This project is licensed under MIT License, which allows commercial use.
</details>

<details>
<summary><strong>Q: How do I add a new user role?</strong></summary>

A: You'll need to:
1. Update the Prisma schema
2. Add role to RBAC middleware
3. Create role-specific routes
4. Update frontend routing
</details>

<details>
<summary><strong>Q: Is there a mobile app?</strong></summary>

A: Not yet, but the web app is fully responsive and works on mobile browsers. A native mobile app is planned for future releases.
</details>

<details>
<summary><strong>Q: How do I backup the database?</strong></summary>

A: Supabase provides automatic daily backups. You can also export data manually from Supabase dashboard or use `pg_dump`.
</details>

---

## 🗺️ Roadmap

### Version 2.0 (Planned)

- [ ] Email notifications
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Export reports (PDF, Excel)
- [ ] Advanced analytics
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] File attachments
- [ ] Multi-language support

### Version 1.1 (Next)

- [ ] Employee performance reviews
- [ ] Salary management
- [ ] Holiday calendar
- [ ] Announcement system
- [ ] Enhanced search
- [ ] Audit logs

### Version 1.0 (Current)

- [x] User authentication
- [x] Role-based access control
- [x] Employee management
- [x] Attendance tracking
- [x] Leave management
- [x] Task management
- [x] Analytics dashboard
- [x] Responsive design

---

## 🙏 Acknowledgments

### Technologies Used

- [React](https://reactjs.org/) - UI library
- [Express.js](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [Supabase](https://supabase.com/) - Database hosting
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting

### Inspiration

This project was inspired by the need for an accessible, free, and open-source employee management solution for small to medium-sized organizations.

### Contributors

Thanks to all contributors who helped make this project better!

<a href="https://github.com/YOUR-USERNAME/employee-management-system/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=YOUR-USERNAME/employee-management-system" />
</a>

---

## 📞 Contact

- **Project Repository**: [https://github.com/adisharma-git/employee-management-system](https://github.com/adisharma-git/employee-management-system)
- **Project Website**: [https://ems-demo.vercel.app](https://ems-demo.vercel.app)


---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**🔀 Fork it to create your own version!**

**🐛 Report issues to help us improve!**

---

Made with ❤️ by the EMS Team

© 2026 Employee Management System. All rights reserved.

[Back to Top](#employee-management-system-ems)

</div>