const express = require('express');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const { updateProfile, getProfile } = require('../controllers/employeeController');

const router = express.Router();

// GET /api/employee/me  -> See my own details
router.get('/me', authenticate, checkPermission(PERMISSIONS.VIEW_EMPLOYEES), getProfile);

// PUT /api/employee/update -> Fill my details
router.put('/update', authenticate, checkPermission(PERMISSIONS.UPDATE_EMPLOYEE), updateProfile);

module.exports = router;