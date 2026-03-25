const express = require('express');
const { createMeeting, getUpcomingMeetings } = require('../controllers/meetingController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const router = express.Router();

router.post('/', authenticate, checkPermission(PERMISSIONS.CREATE_MEETING), createMeeting);
router.get('/upcoming-meetings', authenticate, checkPermission(PERMISSIONS.VIEW_MEETINGS), getUpcomingMeetings);

module.exports = router;