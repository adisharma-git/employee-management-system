const express = require('express');
const { 
  markAttendance, 
  updateCheckout,
  getPunchStatus,
  getMyAttendance,
  getTodayAttendance,
  getAllAttendance,
  getAttendanceReport,
  getAttendanceStatistics,
  deleteAttendance
} = require('../controllers/attendanceController');

const router = express.Router();

// Middleware
const { authenticate, authorize } = require('../middleware/auth');
const { validateMarkAttendance, validateUpdateCheckout } = require('../middleware/attendanceValidation');


// ==========================================
// EMPLOYEE ROUTES (Authenticated users)
// ==========================================

router.post('/mark', authenticate, validateMarkAttendance, markAttendance);
router.patch('/checkout', authenticate, validateUpdateCheckout, updateCheckout);
router.get('/punch-status', authenticate, getPunchStatus);


module.exports = router;