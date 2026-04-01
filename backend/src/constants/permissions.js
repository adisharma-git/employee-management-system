const PERMISSIONS = {
  VIEW_EMPLOYEES: 'view_employees',
  CREATE_EMPLOYEE: 'create_employee',
  UPDATE_EMPLOYEE: 'update_employee',
  DELETE_EMPLOYEE: 'delete_employee',

  APPLY_LEAVE: 'apply_leave',
  APPROVE_LEAVE: 'approve_leave',
  REJECT_LEAVE: 'reject_leave',
  VIEW_ALL_LEAVES: 'view_all_leaves',

  VIEW_ATTENDANCE: 'view_attendance',
  MARK_ATTENDANCE: 'mark_attendance',
  VIEW_ALL_ATTENDANCE: 'view_all_attendance',

  CREATE_ANNOUNCEMENT: 'create_announcement',
  EDIT_ANNOUNCEMENT: 'edit_announcement',
  DELETE_ANNOUNCEMENT: 'delete_announcement',
  VIEW_ANNOUNCEMENTS: 'view_announcements',

  CREATE_MEETING: 'create_meeting',
  EDIT_MEETING: 'edit_meeting',
  DELETE_MEETING: 'delete_meeting',
  VIEW_MEETINGS: 'view_meetings',

  VIEW_PROJECTS: 'view_projects',
  CREATE_PROJECT: 'create_project',
  EDIT_PROJECT: 'edit_project',
  DELETE_PROJECT: 'delete_project',

  VIEW_TASKS: 'view_tasks',
  CREATE_TASK: 'create_task',
  UPDATE_TASK_STATUS: 'update_task_status',
  EDIT_TASK: 'edit_task',
  DELETE_TASK: 'delete_task',
  ASSIGN_TASK: 'assign_task',

  VIEW_PAYROLL: 'view_payroll',
  GENERATE_PAYROLL: 'generate_payroll',
  UPDATE_PAYROLL: 'update_payroll',

  CREATE_HOLIDAYS: 'create_holidays',
  VIEW_HOLIDAYS: 'view_holidays',
  MANAGE_LEAVE_TYPES: 'manage_leave_types',

  VIEW_ROLES: 'view_roles',
  CREATE_ROLE: 'create_role',
  EDIT_ROLE: 'edit_role',
  DELETE_ROLE: 'delete_role',
  MANAGE_PERMISSIONS: 'manage_permissions',

  VIEW_LOGS: 'view_logs',
  VIEW_ADMIN_DASHBOARD: 'view_admin_dashboard',

  VIEW_NOTIFICATIONS: 'view_notifications',
  MANAGE_NOTIFICATIONS: 'manage_notifications',

  VIEW_DAILY_LOGS: 'view_daily_logs',
  CREATE_DAILY_LOG: 'create_daily_log',
  EDIT_DAILY_LOG: 'edit_daily_log'
};

const PERMISSION_CATALOG = Object.values(PERMISSIONS);

module.exports = {
  PERMISSIONS,
  PERMISSION_CATALOG
};