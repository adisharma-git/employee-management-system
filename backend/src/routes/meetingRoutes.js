const express = require('express');
const { createMeeting, getUpcomingMeetings } = require('../controllers/meetingController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, createMeeting);
router.get('/upcoming-meetings', verifyToken, getUpcomingMeetings);

module.exports = router;