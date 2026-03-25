const express = require('express');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const { getAllEmployees, createEmployee } = require('../controllers/adminController');

const router = express.Router();

// GET /api/admin/employees -> View the list
router.get('/employees', authenticate, checkPermission(PERMISSIONS.VIEW_EMPLOYEES), getAllEmployees);

// POST /api/admin/employees -> Create a new one
router.post('/employees', authenticate, checkPermission(PERMISSIONS.CREATE_EMPLOYEE), createEmployee);

module.exports = router;