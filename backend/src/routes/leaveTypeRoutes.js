const express = require('express');
const { createLeaveType, getActiveLeaveTypes } = require('../controllers/leaveTypeController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

// Admin creates policies
router.post('/', authenticate, checkPermission(PERMISSIONS.MANAGE_LEAVE_TYPES), createLeaveType);

// Any authenticated user can view active leave types for dropdowns
router.get('/', authenticate, getActiveLeaveTypes);

module.exports = router;