const express = require('express');
const { authenticate } = require('../middleware/auth');
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
router.get('/', getAllRoles);

// GET permission catalog (master list of all available permissions)
router.get('/catalog/permissions', getPermissionCatalog);

// GET single role by ID
router.get('/:roleId', getRoleById);

// POST create new role
router.post('/', createRole);

// PUT update role
router.put('/:roleId', updateRole);

// DELETE role
router.delete('/:roleId', deleteRole);

module.exports = router;
