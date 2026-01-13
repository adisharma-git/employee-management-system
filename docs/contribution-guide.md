# Contribution Guide
## Employee Management System - How to Contribute

**Version:** 1.0  
**Last Updated:** January 12, 2026  
**Project:** Employee Management System

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Branch Naming Convention](#branch-naming-convention)
3. [Commit Message Convention](#commit-message-convention)
4. [Pull Request Process](#pull-request-process)
5. [Code Review Guidelines](#code-review-guidelines)
6. [Coding Standards](#coding-standards)
7. [Testing Requirements](#testing-requirements)
8. [Documentation Requirements](#documentation-requirements)
9. [Daily Workflow](#daily-workflow)
10. [Best Practices](#best-practices)

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- [ ] GitHub account with repository access
- [ ] Git installed and configured
- [ ] Node.js v18+ installed
- [ ] Code editor (VS Code recommended)
- [ ] Access to team communication channels

### First-Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system

# 2. Configure Git with your details
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. Verify you can see all branches
git branch -a

# 4. Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# 5. Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 6. Configure your .env files with proper values
```

---

## 🌿 Branch Naming Convention

### Format

```
<type>/<short-description>
```

### Branch Types

| Type | Description | Example |
|------|-------------|---------|
| `feature/` | New features or enhancements | `feature/user-authentication` |
| `fix/` | Bug fixes | `fix/login-validation` |
| `docs/` | Documentation updates | `docs/api-documentation` |
| `refactor/` | Code refactoring (no feature change) | `refactor/auth-middleware` |
| `test/` | Adding or updating tests | `test/employee-controller` |
| `chore/` | Maintenance, dependencies, configs | `chore/update-dependencies` |
| `hotfix/` | Critical production fixes | `hotfix/security-patch` |

### Branch Name Guidelines

**✅ Good Branch Names:**
```bash
feature/database-schema-design
feature/jwt-authentication
feature/employee-crud-api
feature/login-page-ui
feature/attendance-calendar
feature/leave-approval-system
fix/cors-configuration
fix/password-validation-bug
fix/attendance-date-format
docs/api-endpoints
docs/setup-instructions
refactor/database-queries
refactor/employee-service
test/auth-integration-tests
chore/eslint-configuration
```

**❌ Bad Branch Names:**
```bash
feature/work           # Too vague
feature/updates        # Not descriptive
new-feature           # Missing type prefix
fix-bug               # Too generic
my-branch             # Personal, not descriptive
test                  # Missing description
johns-work            # Avoid personal names
update                # What update?
```

### Creating a Branch

```bash
# Always create from develop
git checkout develop
git pull origin develop

# Create and switch to new branch
git checkout -b feature/your-feature-name

# Verify you're on the new branch
git branch
```

---

## 💬 Commit Message Convention

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add JWT authentication` |
| `fix` | Bug fix | `fix(api): resolve CORS issue` |
| `docs` | Documentation only | `docs(readme): update setup guide` |
| `style` | Formatting, semicolons, etc. | `style(components): format with Prettier` |
| `refactor` | Code refactoring | `refactor(db): optimize employee queries` |
| `perf` | Performance improvements | `perf(api): add response caching` |
| `test` | Adding or updating tests | `test(auth): add login endpoint tests` |
| `build` | Build system, dependencies | `build(deps): upgrade React to v18` |
| `ci` | CI/CD changes | `ci(github): add automated tests` |
| `chore` | Maintenance tasks | `chore(config): update ESLint rules` |
| `revert` | Revert previous commit | `revert: revert "feat: add feature X"` |

### Commit Message Guidelines

**✅ Good Commit Messages:**

```bash
# Simple feature
feat(auth): implement user registration

# Bug fix
fix(attendance): correct date format validation

# With scope and detailed body
feat(employee): add employee search functionality

- Add search by name, department, and designation
- Implement debounced search for performance
- Add pagination to search results

Closes #23

# Documentation
docs(api): document authentication endpoints

Added comprehensive API documentation for:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

# Refactoring
refactor(services): extract reusable validation logic

Moved validation functions from controllers to separate
validation service for better code organization and reusability.

# Breaking change
feat(api)!: change employee API response format

BREAKING CHANGE: The employee API now returns data in a
different structure. Update frontend accordingly.

Old: { employee: {...} }
New: { data: { employee: {...} } }
```

**❌ Bad Commit Messages:**

```bash
# Too vague
"Update files"
"Fix bug"
"Changes"
"WIP"

# Not descriptive
"Fixed it"
"Done"
"Updates"

# No type prefix
"Added authentication"
"Fixed the login issue"

# All lowercase, no punctuation
"feat add new feature"
```

### Writing Good Commit Messages

**Subject Line (First Line):**
- Use imperative mood ("add" not "added" or "adds")
- Start with lowercase after type
- No period at the end
- Keep under 72 characters
- Be specific and descriptive

**Body (Optional but Recommended):**
- Separate from subject with blank line
- Explain WHAT and WHY, not HOW
- Wrap at 72 characters
- Use bullet points for multiple changes

**Footer (Optional):**
- Reference issues: `Closes #23`, `Fixes #45`
- Note breaking changes: `BREAKING CHANGE: description`
- Co-authors: `Co-authored-by: Name <email>`

### Commit Frequency

**Commit when you:**
- Complete a logical unit of work
- Finish a function or component
- Fix a bug
- Complete a refactoring
- Before taking a break or end of day

**General guideline:** Commit every 30-60 minutes of focused work

### Examples by Developer Role

**Database Developer:**
```bash
feat(db): create users table with constraints
feat(db): add indexes to employees table
fix(db): correct foreign key relationship in leaves table
docs(db): document database schema and relationships
refactor(db): optimize attendance queries with composite index
```

**Backend Developer:**
```bash
feat(auth): implement JWT authentication middleware
feat(api): add employee CRUD endpoints
fix(api): resolve CORS configuration issue
test(auth): add integration tests for login endpoint
refactor(middleware): extract error handling to separate file
```

**Frontend Developer 1:**
```bash
feat(ui): create login page with form validation
feat(auth): implement protected route wrapper
fix(ui): correct responsive layout on mobile
style(components): apply Tailwind CSS styling
refactor(context): simplify auth context logic
```

**Frontend Developer 2:**
```bash
feat(ui): create employee list with search and filter
feat(charts): add attendance trend chart
fix(table): correct pagination bug on employee list
style(dashboard): improve dashboard card layout
refactor(components): extract table component for reuse
```

---

## 📤 Pull Request Process

### When to Create a Pull Request

Create a PR when:
- Feature is complete and working
- Code is tested locally
- All tests pass
- Code follows project standards
- Documentation is updated

### Step-by-Step PR Creation

#### 1. Prepare Your Branch

```bash
# Ensure all changes are committed
git status

# Update from develop
git checkout develop
git pull origin develop

# Merge latest changes into your branch
git checkout feature/your-feature
git merge develop

# Resolve conflicts if any
# After resolving:
git add .
git commit -m "fix: resolve merge conflicts with develop"

# Run tests (if applicable)
npm test

# Push to remote
git push origin feature/your-feature
```

#### 2. Create PR on GitHub

1. Go to repository on GitHub
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Select branches:
   - **Base:** `develop`
   - **Compare:** `feature/your-feature`
5. Click **"Create pull request"**

#### 3. Fill PR Template

**Title Format:** `[type] Brief description`

```
Example titles:
[feat] Add user authentication system
[fix] Resolve CORS configuration issue
[docs] Update API documentation
[refactor] Optimize database queries
```

**Description Template:**

```markdown
## 📝 Description

Brief description of what this PR does.

## 🎯 Type of Change

- [ ] New feature (non-breaking change which adds functionality)
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Test addition/update

## 🔍 What Changed

- Bullet point 1
- Bullet point 2
- Bullet point 3

## 🧪 How to Test

1. Step 1
2. Step 2
3. Expected result

## 📸 Screenshots (if applicable)

[Add screenshots for UI changes]

## 📋 Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## 🔗 Related Issues

Closes #issue-number
Relates to #issue-number

## 📌 Additional Notes

Any additional context or notes for reviewers.
```

#### 4. Request Review

1. On the PR page, click **"Reviewers"** on the right sidebar
2. Select at least **1 team member** to review
3. Add appropriate **labels**: `feature`, `bug`, `documentation`, etc.
4. Assign yourself to the PR
5. Link to related issues

#### 5. Wait for Review

- Check for comments and feedback
- Be responsive to review requests
- Make requested changes promptly

### Example Pull Requests

**Example 1: Feature Addition**

```markdown
# [feat] Implement User Authentication System

## 📝 Description

Adds JWT-based authentication system with user registration, login, and protected routes.

## 🎯 Type of Change

- [x] New feature (non-breaking change which adds functionality)

## 🔍 What Changed

- Created authentication middleware using JWT
- Implemented user registration endpoint with password hashing (bcrypt)
- Implemented login endpoint with credential validation
- Added protected route middleware
- Created user model and database schema

## 🧪 How to Test

1. Start the backend server: `npm run dev`
2. Register a new user:
   ```bash
   POST http://localhost:5000/api/auth/register
   Body: { "email": "test@example.com", "password": "Test123!", "role": "employee" }
   ```
3. Login with credentials:
   ```bash
   POST http://localhost:5000/api/auth/login
   Body: { "email": "test@example.com", "password": "Test123!" }
   ```
4. Access protected route with token:
   ```bash
   GET http://localhost:5000/api/auth/me
   Header: Authorization: Bearer <token>
   ```

## 📋 Checklist

- [x] Code follows style guidelines
- [x] Self-reviewed code
- [x] Commented complex logic
- [x] Updated API documentation
- [x] No new warnings
- [x] Tested locally

## 🔗 Related Issues

Closes #5 - Implement authentication system
Relates to #3 - Database schema for users

## 📌 Additional Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt with salt rounds = 10
- Email validation is performed before registration
```

**Example 2: Bug Fix**

```markdown
# [fix] Resolve CORS configuration issue

## 📝 Description

Fixes CORS error preventing frontend from accessing backend API.

## 🎯 Type of Change

- [x] Bug fix (non-breaking change which fixes an issue)

## 🔍 What Changed

- Configured CORS middleware in Express server
- Added allowed origins for development and production
- Set proper CORS headers for credentials

## 🧪 How to Test

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Try to login from frontend
4. Should no longer see CORS error in browser console

## 📋 Checklist

- [x] Code follows style guidelines
- [x] Self-reviewed code
- [x] Tested locally with frontend

## 🔗 Related Issues

Fixes #12 - CORS error on login

## 📌 Additional Notes

CORS configuration allows requests from:
- http://localhost:5173 (development)
- https://your-app.vercel.app (production)
```

---

## 👀 Code Review Guidelines

### As a Reviewer

#### What to Check

**1. Functionality**
- Does the code do what it's supposed to do?
- Are there any obvious bugs?
- Are edge cases handled?

**2. Code Quality**
- Is the code readable and well-organized?
- Are variable and function names descriptive?
- Is there unnecessary complexity?
- Is code duplicated that could be abstracted?

**3. Best Practices**
- Does it follow project conventions?
- Are there security concerns?
- Is error handling adequate?
- Are there performance issues?

**4. Tests**
- Are there tests for new functionality?
- Do existing tests still pass?
- Is test coverage adequate?

**5. Documentation**
- Are comments clear and helpful?
- Is documentation updated?
- Are API contracts documented?

#### How to Leave Feedback

**✅ Good Feedback:**

```markdown
# Constructive and specific
"Great implementation! One suggestion: consider adding error handling 
for the database connection failure on line 45. If Supabase is down, 
the app will crash."

# Asks questions
"I'm curious about the choice to use a Set here instead of an Array. 
Is it for performance reasons? Could you add a comment explaining?"

# Praises good work
"Love how you extracted this logic into a reusable function. 
Makes the code much cleaner!"

# Offers alternatives
"This works, but you might consider using Promise.all() here for 
better performance when making multiple API calls."

# Specific and actionable
"Please add input validation for the email field before calling 
the database. Current code allows invalid emails to be saved."
```

**❌ Bad Feedback:**

```markdown
# Too vague
"This is wrong."
"Fix this."

# Not constructive
"This code is terrible."
"Did you even test this?"

# Nitpicky without reason
"Use single quotes instead of double quotes."
(Unless it's a project standard)

# Personal attacks
"You obviously don't know what you're doing."
"A beginner could write better code."
```

#### Review Response Time

- **Critical bugs:** Within 2 hours
- **Feature PRs:** Within 24 hours
- **Documentation:** Within 48 hours

#### Approval Process

**Approve when:**
- Code meets all requirements
- No significant issues found
- Minor suggestions are optional

**Request Changes when:**
- Bugs or critical issues exist
- Code doesn't meet standards
- Tests are missing or failing

**Comment when:**
- You have questions
- Suggesting improvements (not blocking)
- Need clarification

### As a PR Author

#### Responding to Reviews

**✅ Good Responses:**

```markdown
# Acknowledge feedback
"Good catch! Fixed in commit abc123."

# Explain reasoning
"I used this approach because it handles edge case X better. 
I've added a comment explaining this."

# Ask for clarification
"I'm not sure I understand this suggestion. Could you elaborate 
on what you mean by 'optimize the query'?"

# Disagree respectfully
"I see your point, but I chose this approach because [reason]. 
What do you think about this trade-off?"

# Show changes made
"Updated as suggested. See commit abc123. Also added tests 
to cover this scenario."
```

**❌ Bad Responses:**

```markdown
# Defensive
"This is fine as it is."
"It works, doesn't it?"

# Dismissive
"That's not important."
"Whatever, I'll change it."

# No response
[Silence - don't ignore feedback]
```

#### Making Changes

```bash
# 1. Make requested changes in your feature branch
# Edit files...

# 2. Commit changes
git add .
git commit -m "refactor: address PR review feedback"

# 3. Push to update PR
git push origin feature/your-feature

# 4. Comment on PR
"Changes made as requested. Please re-review."

# 5. Re-request review
# Click "Re-request review" button on GitHub
```

---

## 💻 Coding Standards

### General Standards

#### File Naming

**Backend (Node.js):**
```
✅ Good:
authController.js
employeeService.js
authMiddleware.js
userModel.js

❌ Bad:
Auth-Controller.js
employee_service.js
auth.js (too generic)
```

**Frontend (React):**
```
✅ Good:
LoginPage.jsx
Button.jsx
EmployeeList.jsx
useAuth.js (hooks)

❌ Bad:
loginpage.jsx
button.js (should be .jsx for components)
employee-list.jsx
```

#### Code Formatting

**Use Prettier (Auto-format):**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Format before commit:**
```bash
npm run format
```

#### Variable Naming

**JavaScript:**
```javascript
// ✅ Good
const userName = 'John Doe';
const isLoggedIn = true;
const MAX_RETRY_COUNT = 3;
const getUserById = (id) => { /* ... */ };

// ❌ Bad
const username = 'John Doe';  // Use camelCase
const is_logged_in = true;    // No snake_case
const maxretrycount = 3;      // Use UPPER_CASE for constants
const GetUserById = (id) => { /* ... */ };  // Functions start with lowercase
```

### Backend Standards (Express.js)

#### Project Structure

```javascript
// ✅ Good structure
backend/
  src/
    controllers/
      authController.js     // Handle HTTP requests
      employeeController.js
    services/
      authService.js        // Business logic
      employeeService.js
    middleware/
      auth.js              // Authentication
      rbac.js              // Authorization
      errorHandler.js
    routes/
      authRoutes.js        // Route definitions
      employeeRoutes.js
    utils/
      jwt.js              // Helper functions
      validators.js
    models/               // If not using Prisma
    server.js            // Entry point
```

#### Controller Pattern

```javascript
// ✅ Good: Thin controllers
const getAllEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const employees = await employeeService.getAll(page, limit);
    res.json({ success: true, data: employees });
  } catch (error) {
    next(error);  // Pass to error handler
  }
};

// ❌ Bad: Business logic in controller
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      // ... complex logic here
    });
    // ... data transformation
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### Error Handling

```javascript
// ✅ Good: Consistent error handling
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Use in controller
if (!user) {
  throw new AppError('User not found', 404);
}

// ❌ Bad: Inconsistent errors
if (!user) {
  return res.status(404).send('User not found');
}
```

#### API Response Format

```javascript
// ✅ Good: Consistent format
{
  "success": true,
  "data": { /* ... */ },
  "message": "Operation successful" // optional
}

// Error format
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors */ ] // optional
}

// ❌ Bad: Inconsistent formats
{ "employee": { /* ... */ } }
{ "result": { /* ... */ } }
```

### Frontend Standards (React)

#### Component Structure

```javascript
// ✅ Good: Functional component with hooks
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className="employee-card">
      {/* JSX */}
    </div>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeCard;

// ❌ Bad: Class component (unless necessary)
class EmployeeCard extends React.Component {
  // ...
}
```

#### State Management

```javascript
// ✅ Good: Descriptive state names
const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ❌ Bad: Generic names
const [data, setData] = useState([]);
const [flag, setFlag] = useState(false);
```

#### Component Organization

```javascript
// ✅ Good: Organized component
const EmployeeList = () => {
  // 1. State declarations
  const [employees, setEmployees] = useState([]);
  
  // 2. Effects
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  // 3. Event handlers
  const handleEdit = (id) => {
    // ...
  };
  
  // 4. Helper functions
  const filterEmployees = () => {
    // ...
  };
  
  // 5. Render logic
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  // 6. Return JSX
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// ❌ Bad: Unorganized
const EmployeeList = () => {
  const handleEdit = (id) => { /* ... */ };
  const [employees, setEmployees] = useState([]);
  const filterEmployees = () => { /* ... */ };
  useEffect(() => { /* ... */ }, []);
  // ...
};
```

### Database Standards (Prisma)

#### Schema Organization

```prisma
// ✅ Good: Well-documented schema
/// User authentication and authorization
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  role          String    // admin, manager, employee
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  employee      Employee?
  
  @@map("users")
  @@index([email])
  @@index([role])
}

// ❌ Bad: No documentation, inconsistent naming
model user {
  id       String  @id @default(uuid())
  email    String  @unique
  password String  // Storing plain password - NEVER DO THIS!
}
```

#### Query Best Practices

```javascript
// ✅ Good: Select only needed fields
const employees = await prisma.employee.findMany({
  select: {
    id: true,
    name: true,
    department: true,
    user: {
      select: {
        email: true,
        role: true,
      },
    },
  },
});

// ❌ Bad: Fetching everything
const employees = await prisma.employee.findMany({
  include: {
    user: true,
    attendance: true,  // Might be thousands of records!
    leaves: true,
    tasks: true,
  },
});
```

---

## 🧪 Testing Requirements

### Testing Standards

#### Backend Testing

```javascript
// ✅ Good: Comprehensive test
describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          role: 'employee',
        });
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.token).toBeDefined();
    });
    
    it('should return 400 with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Test123!',
          role: 'employee',
        });
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
```

#### Frontend Testing

```javascript
// ✅ Good: Component test
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should render email and password inputs', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  
  it('should call onSubmit with form data', () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Test Coverage Requirements

- **Critical paths:** 80%+ coverage
- **Utilities:** 90%+ coverage
- **Components:** 70%+ coverage
- **Integration tests:** All major flows

### Running Tests

```bash
# Backend
cd backend
npm test
npm run test:watch
npm run test:coverage

# Frontend
cd frontend
npm test
npm run test:watch
npm run test:coverage
```

---

## 📚 Documentation Requirements

### Code Comments

```javascript
// ✅ Good: Explain WHY, not WHAT
/**
 * Calculate leave balance for an employee
 * Uses fiscal year (April-March) instead of calendar year
 * because company policy defines annual leave allocation
 * starting from April 1st
 */
const calculateLeaveBalance = (employeeId) => {
  // ...
};

// ❌ Bad: Obvious comments
// Get employee by ID
const employee = getEmployeeById(id);

// Loop through employees
for (const employee of employees) {
  // ...
}
```

### API Documentation

Update `docs/api-contracts.md` when adding/modifying endpoints:

```markdown
## POST /api/employees

Create a new employee record.

**Authentication:** Required (Admin only)

**Request Body:**
\`\`\`json
{
  "userId": "uuid",
  "name": "John Doe",
  "department": "Engineering",
  "designation": "Developer",
  "phone": "+1234567890",
  "dateOfJoining": "2026-01-15"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "John Doe",
    "department": "Engineering"
  }
}
\`\`\`

**Errors:**
- 400: Invalid input data
- 401: Unauthorized
- 403: Forbidden (not admin)
- 409: Employee already exists for this user
```

### README Updates

Update README.md when:
- Adding new setup steps
- Changing tech stack
- Adding new features
- Modifying project structure

---

## 📅 Daily Workflow

### Morning Routine (9:00 AM - 9:30 AM)

```bash
# 1. Attend daily standup (9:00-9:15 AM)
#    Share: What you did yesterday, plan for today, any blockers

# 2. Update your local repository (9:15-9:30 AM)
git checkout develop
git pull origin develop

# 3. Check GitHub Issues
#    - Review assigned issues
#    - Check PR reviews requested from you
#    - Update issue status on Projects board

# 4. Plan your day
#    - Prioritize tasks
#    - Identify integration points
#    - Flag any blockers early
```

### During Development (9:30 AM - 5:00 PM)

```bash
# Work on feature branch
git checkout feature/your-feature

# Commit regularly (every 30-60 minutes)
git add .
git commit -m "feat: add user validation"

# Push periodically (every few commits or before breaks)
git push origin feature/your-feature

# Take breaks
# - 15 min break every 2 hours
# - 1 hour lunch break

# Update task status on GitHub Projects
# - Move cards between columns as work progresses
```

### End of Day Routine (4:30 PM - 5:00 PM)

```bash
# 1. Commit all work (even if incomplete)
git add .
git commit -m "wip: work in progress on feature X"

# 2. Push to remote
git push origin feature/your-feature

# 3. Update GitHub Projects
#    - Move task card to appropriate column
#    - Add comments on progress

# 4. Post daily update in team chat
#    Example: "Completed authentication middleware. 
#             Tomorrow: Writing tests and creating PR."

# 5. Review any PRs assigned to you
#    - Leave feedback
#    - Approve if ready

# 6. Plan tomorrow
#    - Review what's next
#    - Note any blockers
```

### Weekly Routine

**Friday End of Week (4:00 PM - 5:00 PM):**
```bash
# 1. Weekly team retrospective
#    - What went well
#    - What could improve
#    - Action items

# 2. Update documentation
#    - API docs
#    - README
#    - Architecture docs

# 3. Clean up branches
git branch --merged | grep -v "main\|develop" | xargs git branch -d

# 4. Plan next week
#    - Review upcoming tasks
#    - Identify integration points
```

---

## ✨ Best Practices

### General Best Practices

1. **Write Clean Code**
   - Keep functions small and focused
   - Use descriptive names
   - Avoid deep nesting
   - Follow DRY (Don't Repeat Yourself)

2. **Test Your Code**
   - Write tests before creating PR
   - Test edge cases
   - Test error scenarios

3. **Document Your Work**
   - Update docs as you code
   - Comment complex logic
   - Keep README current

4. **Communicate**
   - Post updates regularly
   - Ask for help when stuck (>2 hours)
   - Share knowledge with team

5. **Review Code Thoroughly**
   - Review PRs within 24 hours
   - Give constructive feedback
   - Learn from others' code

### Git Best Practices

1. **Commit Often**
   - Small, logical commits
   - Each commit should work
   - Commit messages should be clear

2. **Pull Before Push**
   - Always update before pushing
   - Merge develop regularly
   - Resolve conflicts promptly

3. **Keep Branches Short-Lived**
   - Merge within 1-3 days
   - Avoid long-running branches
   - Delete after merging

4. **Never Force Push**
   - Unless you're alone on branch
   - Never force push to develop/main
   - Use with extreme caution

5. **Use .gitignore**
   - Never commit secrets
   - Never commit node_modules
   - Never commit IDE files

### Security Best Practices

1. **Never Commit Secrets**
   ```bash
   # ✅ Good: Use environment variables
   const secret = process.env.JWT_SECRET;
   
   # ❌ Bad: Hardcoded secret
   const secret = 'my-secret-key-123';
   ```

2. **Validate Input**
   ```javascript
   // ✅ Good: Validate and sanitize
   const { email, password } = req.body;
   if (!validator.isEmail(email)) {
     throw new AppError('Invalid email', 400);
   }
   
   // ❌ Bad: No validation
   const user = await prisma.user.create({
     data: req.body  // Dangerous!
   });
   ```

3. **Use HTTPS**
   - Always use HTTPS in production
   - Never send passwords over HTTP

4. **Hash Passwords**
   ```javascript
   // ✅ Good: Hash with bcrypt
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // ❌ Bad: Store plain text
   const password = req.body.password;  // NEVER!
   ```

### Performance Best Practices

1. **Optimize Queries**
   ```javascript
   // ✅ Good: Select only needed fields
   const employees = await prisma.employee.findMany({
     select: { id: true, name: true },
   });
   
   // ❌ Bad: Fetch everything
   const employees = await prisma.employee.findMany();
   ```

2. **Use Pagination**
   ```javascript
   // ✅ Good: Paginate results
   const employees = await prisma.employee.findMany({
     skip: (page - 1) * limit,
     take: limit,
   });
   
   // ❌ Bad: Return all records
   const employees = await prisma.employee.findMany();
   ```

3. **Cache When Possible**
   ```javascript
   // ✅ Good: Cache frequently accessed data
   const cachedStats = cache.get('dashboard-stats');
   if (cachedStats) return cachedStats;
   ```

4. **Lazy Load**
   ```javascript
   // ✅ Good: Load on demand
   const Component = lazy(() => import('./Component'));
   
   // ❌ Bad: Import everything upfront
   import Component1 from './Component1';
   import Component2 from './Component2';
   // ... 50 more imports
   ```

---

## 🚫 What NOT to Do

### Never Do These

1. **Never commit directly to main or develop**
   ```bash
   # ❌ NEVER DO THIS
   git checkout main
   git add .
   git commit -m "quick fix"
   git push origin main
   ```

2. **Never commit sensitive data**
   ```bash
   # ❌ Files that should NEVER be committed:
   .env
   .env.local
   secrets.json
   private_keys/
   database_backup.sql
   ```

3. **Never force push to shared branches**
   ```bash
   # ❌ NEVER DO THIS on develop or main
   git push --force origin develop
   ```

4. **Never work on multiple features in one branch**
   ```bash
   # ❌ Bad: One branch with auth + employees + attendance
   # ✅ Good: Separate branches for each feature
   ```

5. **Never merge your own PRs without review**
   - Always wait for approval
   - Exception: Documentation typos

6. **Never ignore CI/CD failures**
   - Fix failing tests immediately
   - Don't merge if tests fail

7. **Never use commented-out code**
   ```javascript
   // ❌ Bad: Commented code
   // const oldFunction = () => {
   //   // Old implementation
   // };
   
   // ✅ Good: Use Git history instead
   // Just delete it - Git remembers!
   ```

8. **Never skip documentation**
   - Update docs with code changes
   - Don't leave it for later

---

## 🆘 Getting Help

### When You're Stuck

1. **Try to solve it yourself (30 min)**
   - Google the error
   - Check documentation
   - Review similar code in project

2. **Check project resources (15 min)**
   - README.md
   - docs/ folder
   - GitHub Issues (closed and open)

3. **Ask a teammate (immediately)**
   - Post in team chat
   - Include: what you're trying, what's happening, what you've tried
   - Tag relevant team member

4. **Pair program (if needed)**
   - Screen share
   - Work through problem together
   - Learn from each other

### How to Ask for Help

**✅ Good question:**
```
I'm trying to implement JWT authentication but getting 
"jsonwebtoken must be a string" error.

What I'm doing:
- Creating token with: jwt.sign(payload, process.env.JWT_SECRET)
- Payload: { userId: '123', role: 'employee' }
- JWT_SECRET is set in .env file

What happens:
- Getting error on line 45 in authController.js
- Token is undefined

What I've tried:
- Verified .env file has JWT_SECRET
- Logged payload - it's correct
- Logged JWT_SECRET - it's undefined!

I think maybe .env isn't loading properly?
```

**❌ Bad question:**
```
JWT not working. Help?
```

### Resources

- **Team Chat:** Post questions here first
- **GitHub Issues:** Search existing issues
- **Documentation:** Check docs/ folder
- **Stack Overflow:** For general programming questions
- **Official Docs:** React, Express, Prisma documentation

---

## ✅ Checklist Before Creating PR

- [ ] All changes committed
- [ ] Branch is up to date with develop
- [ ] Code follows project standards
- [ ] No console.logs or debugger statements
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Self-reviewed code
- [ ] No linting errors
- [ ] Tested locally
- [ ] PR description is clear and complete

---

## 🎓 Learning Resources

### For All Developers
- **Git:** https://learngitbranching.js.org/
- **JavaScript:** https://javascript.info/
- **Clean Code:** https://github.com/ryanmcdermott/clean-code-javascript

### For Backend Developers
- **Node.js:** https://nodejs.dev/learn
- **Express:** https://expressjs.com/
- **Prisma:** https://www.prisma.io/docs

### For Frontend Developers
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Router:** https://reactrouter.com/

---

## 📝 Summary

**Key Takeaways:**

1. Always work in feature branches
2. Write clear commit messages
3. Create PRs for all changes
4. Review code thoroughly
5. Test before committing
6. Document as you code
7. Communicate with team
8. Ask for help when stuck
9. Follow coding standards
10. Be kind and constructive

**Remember:** We're building this together. Help each other, learn from mistakes, and celebrate wins! 🎉

---

**Questions?** Open an issue or ask in team chat!

**Document Version:** 1.0  
**Last Updated:** January 12, 2026  
**Maintained By:** Team Lead