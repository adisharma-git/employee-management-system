const express = require('express');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getPermissionCatalog
} = require('../controllers/roleController');

const router = express.Router();

// All role routes require authentication
router.use(authenticate);

// GET all roles
router.get('/', checkPermission(PERMISSIONS.VIEW_ROLES), getAllRoles);

// GET permission catalog (master list of all available permissions)
router.get('/catalog/permissions', checkPermission(PERMISSIONS.VIEW_ROLES), getPermissionCatalog);

// GET single role by ID
router.get('/:roleId', checkPermission(PERMISSIONS.VIEW_ROLES), getRoleById);

// POST create new role
router.post('/', checkPermission(PERMISSIONS.CREATE_ROLE), createRole);

// PUT update role
router.put('/:roleId', checkPermission(PERMISSIONS.EDIT_ROLE), updateRole);

// DELETE role
router.delete('/:roleId', checkPermission(PERMISSIONS.DELETE_ROLE), deleteRole);

module.exports = router;
