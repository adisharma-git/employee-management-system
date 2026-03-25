const express = require('express');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

// Admin creates an announcement
router.post('/', authenticate, checkPermission(PERMISSIONS.CREATE_ANNOUNCEMENT), createAnnouncement);

// Everyone can view the announcements
router.get('/', authenticate, checkPermission(PERMISSIONS.VIEW_ANNOUNCEMENTS), getAnnouncements);

module.exports = router;