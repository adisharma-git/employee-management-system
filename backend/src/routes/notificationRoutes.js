const express = require('express');
const { getMyNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply verifyToken to all routes
router.use(verifyToken); 

router.get('/', getMyNotifications);
router.patch('/read-all', markAllAsRead); // IMPORTANT: Must be above the /:id route
router.patch('/:id/read', markAsRead);

module.exports = router;