const { PERMISSIONS } = require('../constants/permissions');

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

module.exports = {
  DEFAULT_EMPLOYEE_PERMISSIONS,
  ensureDefaultEmployeePermissions
};