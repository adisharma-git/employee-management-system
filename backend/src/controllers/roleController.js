const prisma = require('../utils/prisma');

// ==========================================
// GET ALL ROLES
// ==========================================
exports.getAllRoles = async (req, res) => {
  try {
    // Check if user is Super Admin
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can view roles'
      });
    }

    const roles = await prisma.role.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch roles',
      error: error.message
    });
  }
};

// ==========================================
// GET SINGLE ROLE BY ID
// ==========================================
exports.getRoleById = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can view roles'
      });
    }

    const { roleId } = req.params;

    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: { users: { select: { id: true, email: true } } }
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch role',
      error: error.message
    });
  }
};

// ==========================================
// CREATE NEW ROLE
// ==========================================
exports.createRole = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can create roles'
      });
    }

    const { name, description, permissions } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Role name is required'
      });
    }

    // Check if role already exists
    const existingRole = await prisma.role.findUnique({
      where: { name }
    });

    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Role with this name already exists'
      });
    }

    // Create role with empty permissions array if not provided
    const role = await prisma.role.create({
      data: {
        name,
        description: description || null,
        permissions: permissions || []
      }
    });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: role
    });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create role',
      error: error.message
    });
  }
};

// ==========================================
// UPDATE ROLE
// ==========================================
exports.updateRole = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can update roles'
      });
    }

    const { roleId } = req.params;
    const { name, description, permissions } = req.body;

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!existingRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    // Check if new name already exists (if name is being changed)
    if (name && name !== existingRole.name) {
      const duplicateName = await prisma.role.findUnique({
        where: { name }
      });

      if (duplicateName) {
        return res.status(400).json({
          success: false,
          message: 'Role with this name already exists'
        });
      }
    }

    // Update role
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(permissions !== undefined && { permissions })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: updatedRole
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update role',
      error: error.message
    });
  }
};

// ==========================================
// DELETE ROLE
// ==========================================
exports.deleteRole = async (req, res) => {
  try {
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can delete roles'
      });
    }

    const { roleId } = req.params;

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!existingRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    // Check if any users are assigned to this role
    const usersWithRole = await prisma.user.count({
      where: { roleId }
    });

    if (usersWithRole > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete role. ${usersWithRole} user(s) are assigned to this role.`
      });
    }

    // Delete role
    await prisma.role.delete({
      where: { id: roleId }
    });

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete role',
      error: error.message
    });
  }
};

// ==========================================
// GET MASTER PERMISSION CATALOG
// Returns all available permissions in the system
// ==========================================
exports.getPermissionCatalog = async (req, res) => {
  try {
    const permissions = [
      // Employee Management
      'view_employees',
      'create_employee',
      'update_employee',
      'delete_employee',

      // Leave Management
      'apply_leave',
      'approve_leave',
      'reject_leave',
      'view_all_leaves',

      // Attendance
      'view_attendance',
      'mark_attendance',
      'view_all_attendance',

      // Announcements
      'create_announcement',
      'edit_announcement',
      'delete_announcement',
      'view_announcements',

      // Meetings
      'create_meeting',
      'edit_meeting',
      'delete_meeting',
      'view_meetings',

      // Projects & Tasks
      'view_projects',
      'create_project',
      'edit_project',
      'delete_project',
      'view_tasks',
      'create_task',
      'update_task_status',
      'edit_task',
      'delete_task',
      'assign_task',

      // Payroll
      'view_payroll',
      'generate_payroll',
      'update_payroll',

      // Holidays & Leave Types
      'manage_holidays',
      'manage_leave_types',

      // Roles & Permissions
      'manage_roles',
      'manage_permissions',

      // Logs & Admin
      'view_logs',
      'view_admin_dashboard',

      // Notifications
      'view_notifications',
      'manage_notifications',

      // Daily Logs
      'view_daily_logs',
      'create_daily_log',
      'edit_daily_log'
    ];

    res.status(200).json({
      success: true,
      data: permissions
    });
  } catch (error) {
    console.error('Error fetching permission catalog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch permission catalog',
      error: error.message
    });
  }
};
