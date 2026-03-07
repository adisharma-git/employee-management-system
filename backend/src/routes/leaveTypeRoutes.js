const express = require('express');
const { createLeaveType, getActiveLeaveTypes } = require('../controllers/leaveTypeController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin creates policies
router.post('/', verifyToken, verifyAdmin, createLeaveType);

// Everyone (Employees/Admins) can view policies to populate dropdowns
router.get('/', verifyToken, getActiveLeaveTypes);

module.exports = router;