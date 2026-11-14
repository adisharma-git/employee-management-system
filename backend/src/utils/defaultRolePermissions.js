const { PERMISSIONS } = require('../constants/permissions');
const { DEMO_ROLE_NAME } = require('../constants/demo');

const DEFAULT_EMPLOYEE_PERMISSIONS = [
  PERMISSIONS.UPDATE_EMPLOYEE,
  PERMISSIONS.APPLY_LEAVE,
  PERMISSIONS.VIEW_ATTENDANCE,
  PERMISSIONS.MARK_ATTENDANCE,
  PERMISSIONS.VIEW_ANNOUNCEMENTS,
  PERMISSIONS.VIEW_MEETINGS,
  PERMISSIONS.VIEW_HOLIDAYS,
  PERMISSIONS.VIEW_PROJECTS,
  PERMISSIONS.VIEW_TASKS,
  PERMISSIONS.UPDATE_TASK_STATUS,
  PERMISSIONS.VIEW_NOTIFICATIONS,
  PERMISSIONS.VIEW_DAILY_LOGS,
  PERMISSIONS.CREATE_DAILY_LOG,
  PERMISSIONS.EDIT_DAILY_LOG,
  PERMISSIONS.VIEW_PAYROLL,
];

// Demo visitors share one fake company, so they get admin-style access to
// explore features but nothing that deletes data or changes roles/permissions
// (which would let one visitor break the demo for everyone else).
const DEMO_PERMISSIONS = [
  PERMISSIONS.VIEW_EMPLOYEES,
  PERMISSIONS.CREATE_EMPLOYEE,
  PERMISSIONS.UPDATE_EMPLOYEE,

  PERMISSIONS.APPLY_LEAVE,
  PERMISSIONS.APPROVE_LEAVE,
  PERMISSIONS.REJECT_LEAVE,
  PERMISSIONS.VIEW_ALL_LEAVES,

  PERMISSIONS.VIEW_ATTENDANCE,
  PERMISSIONS.MARK_ATTENDANCE,
  PERMISSIONS.VIEW_ALL_ATTENDANCE,

  PERMISSIONS.CREATE_ANNOUNCEMENT,
  PERMISSIONS.EDIT_ANNOUNCEMENT,
  PERMISSIONS.VIEW_ANNOUNCEMENTS,

  PERMISSIONS.CREATE_MEETING,
  PERMISSIONS.EDIT_MEETING,
  PERMISSIONS.VIEW_MEETINGS,

  PERMISSIONS.VIEW_PROJECTS,
  PERMISSIONS.CREATE_PROJECT,
  PERMISSIONS.EDIT_PROJECT,

  PERMISSIONS.VIEW_TASKS,
  PERMISSIONS.CREATE_TASK,
  PERMISSIONS.UPDATE_TASK_STATUS,
  PERMISSIONS.EDIT_TASK,
  PERMISSIONS.ASSIGN_TASK,

  PERMISSIONS.VIEW_PAYROLL,
  PERMISSIONS.GENERATE_PAYROLL,
  PERMISSIONS.UPDATE_PAYROLL,

  PERMISSIONS.CREATE_HOLIDAYS,
  PERMISSIONS.VIEW_HOLIDAYS,

  PERMISSIONS.VIEW_ROLES,
  PERMISSIONS.VIEW_LOGS,
  PERMISSIONS.VIEW_ADMIN_DASHBOARD,
  PERMISSIONS.VIEW_NOTIFICATIONS,

  PERMISSIONS.VIEW_DAILY_LOGS,
  PERMISSIONS.CREATE_DAILY_LOG,
  PERMISSIONS.EDIT_DAILY_LOG,
];

async function ensureDefaultEmployeePermissions(prisma) {
  const employeeRole = await prisma.role.findUnique({
    where: { name: 'Employee' }
  });

  if (!employeeRole || (employeeRole.permissions && employeeRole.permissions.length > 0)) {
    return false;
  }

  await prisma.role.update({
    where: { id: employeeRole.id },
    data: { permissions: DEFAULT_EMPLOYEE_PERMISSIONS }
  });

  return true;
}

// Creates the Demo role, or resets its permissions to DEMO_PERMISSIONS on
// every boot so edits made through the roles UI never stick.
async function ensureDemoRole(prisma) {
  return prisma.role.upsert({
    where: { name: DEMO_ROLE_NAME },
    update: { permissions: DEMO_PERMISSIONS },
    create: {
      name: DEMO_ROLE_NAME,
      description: 'Temporary demo visitors',
      permissions: DEMO_PERMISSIONS
    }
  });
}

module.exports = {
  DEFAULT_EMPLOYEE_PERMISSIONS,
  DEMO_PERMISSIONS,
  ensureDefaultEmployeePermissions,
  ensureDemoRole
};