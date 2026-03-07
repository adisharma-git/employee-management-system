const express = require('express');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin creates an announcement
router.post('/', verifyToken, verifyAdmin, createAnnouncement);

// Everyone can view the announcements
router.get('/', verifyToken, getAnnouncements);

module.exports = router;