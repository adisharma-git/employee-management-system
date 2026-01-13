# Employee Management System (EMS)

A full-stack, cloud-hosted employee management system with role-based access control.

## 🏗️ Project Overview

**Duration:** 20 Days (January 13 - February 7, 2026)  
**Team Size:** 4 Developers  
**Deployment:** Free-tier cloud services

## 👥 Team Members

| Role | Name | Responsibilities |
|------|------|------------------|
| **Database Developer** | [ANIKET ADARSH] | Supabase, Prisma, Schema Design |
| **Backend Developer** | [ADITYA SHARMA] | Express APIs, Authentication, Business Logic |
| **Frontend Developer 1** | [HIMANSHU PANDEY] | Auth UI, Routing, Core Layouts |
| **Frontend Developer 2** | [AKRITI KUMARI] | Feature UIs, Components, Analytics |

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State:** React Context API
- **Charts:** Recharts
- **Deployment:** Vercel (Free Tier)

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **Deployment:** Render (Free Tier)

### Database
- **Database:** PostgreSQL
- **Hosting:** Supabase (Free Tier)
- **ORM:** Prisma
- **Migrations:** Prisma Migrate

## 📁 Project Structure

employee-management-system/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth, RBAC, Error handling
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Helper functions
│   │   └── server.js     # Entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React Context
│   │   ├── services/     # API calls
│   │   └── App.jsx       # Main component
│   └── package.json
├── docs/                 # Project documentation
│   ├── architecture.md
│   ├── api-contracts.md
│   ├── database-schema.md
│   └── setup-guide.md
└── README.md            # This file

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Git
- PostgreSQL (via Supabase)

### Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR-USERNAME/employee-management-system.git
   cd employee-management-system
```

2. **Backend Setup**
```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your DATABASE_URL and JWT_SECRET in .env
   npx prisma migrate dev
   npm run dev
```

3. **Frontend Setup**
```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your VITE_API_URL in .env
   npm run dev
```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api-contracts.md)
- [Database Schema](docs/database-schema.md)
- [Setup Guide](docs/setup-guide.md)
- [Deployment Guide](docs/deployment.md)
- [Contribution Guide](docs/contribution-guide.md)

## 🔑 Features

### Admin Features
- Dashboard with analytics
- Employee management (CRUD)
- Attendance reports
- Leave approvals
- Task assignment
- System analytics

### Manager Features
- Team dashboard
- Leave approval/rejection
- Task assignment
- Team attendance monitoring

### Employee Features
- Personal dashboard
- Mark attendance
- Request leaves
- View assigned tasks
- Update task status

## 🌿 Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development branches

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Create a pull request to `develop`
4. Wait for code review
5. Merge after approval

See [Contribution Guide](docs/contribution-guide.md) for details.

## 📝 Git Workflow
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on feature
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name

# Create PR on GitHub
```
## 🐛 Issue Tracking

Use GitHub Issues for:
- Bug reports
- Feature requests
- Task tracking

Use GitHub Projects for sprint planning.

## 📅 Timeline

- **Week 1 (Days 1-5):** Foundation & Authentication
- **Week 2 (Days 6-10):** Core APIs & Features
- **Week 3 (Days 11-15):** Advanced Features & Integration
- **Week 4 (Days 16-20):** Testing, Deployment & Documentation

## 🎯 Success Criteria

- ✅ All features implemented
- ✅ Authentication & authorization working
- ✅ CRUD operations for all entities
- ✅ Deployed on free-tier services
- ✅ Complete documentation
- ✅ Zero critical bugs

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Search GitHub Issues
3. Contact team lead
4. Create a new issue if needed


**Built with ❤️ by the EMS Team**

Last Updated: January 13, 2026
EOF