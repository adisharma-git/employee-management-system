const express = require('express');
const { 
  markAttendance, 
  updateCheckout,
  getPunchStatus,
  getMyAttendance,
  toggleBreak,
  getAllAttendance
} = require('../controllers/attendanceController');

//for admin attendance summary
const { getMonthlySummary } = require('../controllers/attendanceController');

//for employee monthly summary
const { getMyMonthlySummary } = require('../controllers/attendanceController');

//auto mark absentees
const { markAbsentees } = require('../controllers/attendanceController');

const { remindCheckIn, remindCheckOut } = require('../controllers/attendanceController');

const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const router = express.Router();

// --- EMPLOYEE ROUTES ---
router.post('/mark', authenticate, checkPermission(PERMISSIONS.MARK_ATTENDANCE), markAttendance);
router.patch('/checkout', authenticate, checkPermission(PERMISSIONS.MARK_ATTENDANCE), updateCheckout);
router.get('/punch-status', authenticate, checkPermission(PERMISSIONS.VIEW_ATTENDANCE), getPunchStatus);

// New: Break Handling
router.post('/break', authenticate, checkPermission(PERMISSIONS.MARK_ATTENDANCE), toggleBreak); 

/*
# Page 1 (Last 7 days) - Default
GET /api/attendance/my-attendance-history

# Page 2 (7-13 days ago)
GET /api/attendance/my-attendance-history?page=2

# Custom: 14 days per page
GET /api/attendance/my-attendance-history?page=1&pageSize=14

# Old method still works: Single date
GET /api/attendance/my-attendance-history?date=2026-04-01

# Old method still works: Date range
GET /api/attendance/my-attendance-history?fromDate=2026-04-01&toDate=2026-04-15
*/

// New: Employee History
router.get('/my-attendance-history', authenticate, checkPermission(PERMISSIONS.VIEW_ATTENDANCE), getMyAttendance);

// New: Employee Monthly Summary
router.get('/my-monthly-summary', authenticate, checkPermission(PERMISSIONS.VIEW_ATTENDANCE), getMyMonthlySummary);

// --- ADMIN ROUTES ---
// New: View All Attendance (Protected by verifyAdmin)
router.get('/all-employees-attendance', authenticate, checkPermission(PERMISSIONS.VIEW_ALL_ATTENDANCE), getAllAttendance);
router.get('/monthly-summary', authenticate, checkPermission(PERMISSIONS.VIEW_ALL_ATTENDANCE), getMonthlySummary);

// Add this route
router.post('/auto-mark-absent', authenticate, checkPermission(PERMISSIONS.MARK_ATTENDANCE), markAbsentees);

// Add these to your route list (Make sure they are above any routes using /:id)
router.post('/remind-check-in', authenticate, checkPermission(PERMISSIONS.MANAGE_NOTIFICATIONS), remindCheckIn);
router.post('/remind-check-out', authenticate, checkPermission(PERMISSIONS.MANAGE_NOTIFICATIONS), remindCheckOut);

module.exports = router;