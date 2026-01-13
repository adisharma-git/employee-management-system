# Employee Management System (EMS)

A full-stack, cloud-hosted employee management system with role-based access control.

## 🏗️ Project Overview

**Duration:** 20 Days (January 13 - February 7, 2026)  
**Team Size:** 4 Developers  
**Deployment:** Free-tier cloud services

## 👥 Team Members

| Role | Name | Responsibilities |
|------|------|------------------|
| **Database Developer** | [Name] | Supabase, Prisma, Schema Design |
| **Backend Developer** | [Name] | Express APIs, Authentication, Business Logic |
| **Frontend Developer 1** | [Name] | Auth UI, Routing, Core Layouts |
| **Frontend Developer 2** | [Name] | Feature UIs, Components, Analytics |

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
cat > backend/.env.example << 'EOF'
# Database Configuration
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (Frontend URL)
FRONTEND_URL="http://localhost:5173"
