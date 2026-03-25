const express = require('express');
const { createLeaveType, getActiveLeaveTypes } = require('../controllers/leaveTypeController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

// Admin creates policies
router.post('/', authenticate, checkPermission(PERMISSIONS.MANAGE_LEAVE_TYPES), createLeaveType);

// Everyone (Employees/Admins) can view policies to populate dropdowns
router.get('/', authenticate, checkPermission(PERMISSIONS.MANAGE_LEAVE_TYPES), getActiveLeaveTypes);

module.exports = router;