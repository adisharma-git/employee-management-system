const express = require('express');
const { 
  applyForLeave, 
  getMyBalances, 
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

router.post('/apply', authenticate, checkPermission(PERMISSIONS.APPLY_LEAVE), applyForLeave);
router.get('/my-balances', authenticate, checkPermission(PERMISSIONS.APPLY_LEAVE), getMyBalances);
router.get('/my-history', authenticate, checkPermission(PERMISSIONS.APPLY_LEAVE), getMyLeaves);

// GET: View all leaves (Can filter with ?status=pending)
router.get('/all', authenticate, checkPermission(PERMISSIONS.VIEW_ALL_LEAVES), getAllLeaves);

// PATCH: Approve or Reject a leave
router.patch('/:id/status', authenticate, checkPermission(PERMISSIONS.APPROVE_LEAVE), updateLeaveStatus);

module.exports = router;