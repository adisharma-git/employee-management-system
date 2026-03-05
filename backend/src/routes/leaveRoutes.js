const express = require('express');
const { 
  applyForLeave, 
  getMyBalances, 
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', verifyToken, applyForLeave);
router.get('/my-balances', verifyToken, getMyBalances);
router.get('/my-history', verifyToken, getMyLeaves);

// GET: View all leaves (Can filter with ?status=pending)
router.get('/all', verifyToken, verifyAdmin, getAllLeaves);

// PATCH: Approve or Reject a leave
router.patch('/:id/status', verifyToken, verifyAdmin, updateLeaveStatus);

module.exports = router;