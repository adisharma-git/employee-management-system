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

const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Check your path!
const router = express.Router();

// --- EMPLOYEE ROUTES ---
router.post('/mark', verifyToken, markAttendance);
router.patch('/checkout', verifyToken, updateCheckout);
router.get('/punch-status', verifyToken, getPunchStatus);

// New: Break Handling
router.post('/break', verifyToken, toggleBreak); 

// New: Employee History
router.get('/my-attendance-history', verifyToken, getMyAttendance);

// New: Employee Monthly Summary
router.get('/my-monthly-summary', verifyToken, getMyMonthlySummary);

// --- ADMIN ROUTES ---
// New: View All Attendance (Protected by verifyAdmin)
router.get('/all-employees-attendance', verifyToken, verifyAdmin, getAllAttendance);
router.get('/monthly-summary', verifyToken, verifyAdmin, getMonthlySummary);

// Add this route
router.post('/auto-mark-absent', markAbsentees);

// Add these to your route list (Make sure they are above any routes using /:id)
router.post('/remind-check-in', remindCheckIn);
router.post('/remind-check-out', remindCheckOut);

module.exports = router;