# Contributing to Employee Management System

First off, thank you for considering contributing to the Employee Management System! It's people like you that make EMS such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](docs/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check if the issue already exists. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required PR template
- Follow the styleguides (see below)
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Git
- PostgreSQL (or Supabase account)
- VS Code (recommended)

### Local Development Environment

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

# 3. Add upstream remote
git remote add upstream https://github.com/original-owner/employee-management-system.git

# 4. Install backend dependencies
cd backend
npm install

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 7. Update .env files with your local database credentials

# 8. Run migrations
cd backend
npx prisma migrate dev

# 9. Start development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Git Workflow

### Branch Naming Convention

- `feature/brief-description` - New feature
- `fix/brief-description` - Bug fix
- `docs/brief-description` - Documentation changes
- `refactor/brief-description` - Code refactoring
- `test/brief-description` - Adding or updating tests
- `chore/brief-description` - Configuration, dependencies, etc.

Example: `feature/payroll-report-generation`

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect code meaning
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Code changes that improve performance
- `test:` Adding or updating tests
- `chore:` Changes to build process, dependencies, etc.

**Scope:** Component or module affected (e.g., `attendance`, `payroll`, `auth`)

**Subject:** Short summary (50 chars or less), lowercase, imperative mood, no period

**Example:**
```
feat(payroll): add monthly payroll generation

- Implement salary calculation algorithm
- Add payroll history tracking
- Create payroll export functionality

Closes #123
```

### Creating a Pull Request

1. Create a feature branch from `main`
2. Make your changes
3. Write or update tests as needed
4. Run the test suite locally: `npm test`
5. Commit your changes with proper commit messages
6. Push to your fork
7. Create a Pull Request with a clear title and description
8. Link any related issues: `Closes #123`

**PR Title Format:**
```
[Type] Brief description (Ticket #123)
```

Examples:
- `[Feature] Add payroll management system (#45)`
- `[Fix] Correct attendance date filter (#46)`
- `[Docs] Update API documentation (#47)`

## Styleguides

### JavaScript/React Code Style

- Use ESLint configuration provided in the project
- Use Prettier for code formatting
- Use 2-space indentation
- Use meaningful variable names
- Write self-documenting code
- Add comments for complex logic

```bash
# Run linting
npm run lint

# Format code automatically
npm run format
```

### Git Commit Style

- Use the Conventional Commits format
- Write descriptive commit messages
- Reference issues in commits: `Closes #123`
- Keep commits focused and atomic

### Documentation Style

- Use clear, concise language
- Use Markdown for documentation
- Include code examples where appropriate
- Keep documentation up-to-date with code changes
- Use proper heading hierarchy

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Testing Requirements

- Write tests for new features
- Update tests when modifying existing features
- Maintain 80%+ code coverage for critical paths
- Test both success and error scenarios

### Test Naming Convention

```javascript
describe('Feature Name', () => {
  describe('When condition', () => {
    it('should expected behavior', () => {
      // Test implementation
    });
  });
});
```

## Documentation Updates

When submitting a PR that affects documentation:

1. Update the relevant `.md` files in the `docs/` folder
2. Update `README.md` if necessary
3. Update API documentation if API changes are made
4. Include examples and code samples where applicable

## Review Process

All submissions are subject to review by project maintainers:

- At least one approval from a maintainer is required
- All checks (linting, tests, etc.) must pass
- Constructive feedback will be provided if changes are needed
- Discussions are encouraged and feedback is valued

## Additional Notes

### Project Structure

```
employee-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── prisma/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── main.jsx
└── docs/
```

### Key Technologies

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, Prisma
- **Database:** PostgreSQL

### Common Commands

```bash
# Backend
cd backend
npm run dev        # Start development server
npm run build      # Build for production
npm test          # Run tests
npm run lint      # Run linter

# Frontend
cd frontend
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter
```

## Questions?

- Check existing [GitHub Issues](https://github.com/your-username/employee-management-system/issues)
- Read the [documentation](docs/)
- Create a new issue with the `question` label

## Recognition

Contributors will be recognized in:
- The [CONTRIBUTORS.md](docs/CONTRIBUTORS.md) file
- Release notes for their contributions
- GitHub's automatic contributors page

Thank you for contributing! 🎉
