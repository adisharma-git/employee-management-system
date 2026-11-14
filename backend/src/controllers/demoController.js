const { randomUUID } = require('crypto');
const prisma = require('../utils/prisma');
const { hashPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const {
  DEMO_ROLE_NAME,
  DEMO_SESSION_MINUTES,
  DEMO_PROFILE_DEFAULTS
} = require('../constants/demo');

const MAX_NAME_LENGTH = 50;

// POST /api/auth/demo
// Creates a temporary account that stops working after DEMO_SESSION_MINUTES.
// Body: { name?: string }. Response has the same shape as /api/auth/login,
// plus user.isDemo and user.expiresAt for the frontend countdown.
exports.startDemo = async (req, res) => {
  try {
    const rawName = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const name = rawName.slice(0, MAX_NAME_LENGTH) || 'Demo User';

    const demoRole = await prisma.role.findUnique({
      where: { name: DEMO_ROLE_NAME },
      select: { id: true }
    });

    if (!demoRole) {
      return res.status(503).json({
        success: false,
        message: 'Demo is not available right now.'
      });
    }

    const expiresAt = new Date(Date.now() + DEMO_SESSION_MINUTES * 60 * 1000);
    // Demo accounts never log in with a password; this just fills the column.
    const passwordHash = await hashPassword(randomUUID());

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: `demo-${randomUUID()}@demo.local`,
          passwordHash,
          roleId: demoRole.id,
          isSuperAdmin: false,
          isDemo: true,
          expiresAt,
          employee: {
            create: {
              name,
              department: DEMO_PROFILE_DEFAULTS.department,
              designation: DEMO_PROFILE_DEFAULTS.designation,
              dateOfJoining: new Date()
            }
          }
        },
        include: {
          employee: true,
          role: {
            select: { id: true, name: true, permissions: true }
          }
        }
      });

      // Same onboarding as adminController.createEmployee, so the leave and
      // payroll screens work for the visitor.
      const activeLeaveTypes = await tx.leaveType.findMany({
        where: { isActive: true },
        select: { id: true, defaultDays: true }
      });

      if (activeLeaveTypes.length > 0) {
        await tx.leaveBalance.createMany({
          data: activeLeaveTypes.map((leaveType) => ({
            employeeId: newUser.employee.id,
            leaveTypeId: leaveType.id,
            allocated: leaveType.defaultDays,
            used: 0
          }))
        });
      }

      await tx.salaryStructure.create({
        data: {
          employeeId: newUser.employee.id,
          baseSalary: DEMO_PROFILE_DEFAULTS.baseSalary,
          allowances: DEMO_PROFILE_DEFAULTS.allowances,
          taxRate: DEMO_PROFILE_DEFAULTS.taxRate
        }
      });

      return newUser;
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
        role: user.role,
        name: user.employee.name,
        isDemo: true,
        expiresAt: user.expiresAt
      }
    });
  } catch (error) {
    console.error('Start Demo Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while starting the demo'
    });
  }
};
