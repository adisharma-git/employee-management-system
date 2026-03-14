const express = require('express');
const { 
  markAttendance, 
  updateCheckout,
  getPunchStatus,
  getMyAttendance,
  toggleBreak,
  getAllAttendance
} = require('../controllers/attendanceController');

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


// --- ADMIN ROUTES ---
// New: View All Attendance (Protected by verifyAdmin)
router.get('/all-employees-attendance', verifyToken, verifyAdmin, getAllAttendance);

module.exports = router;