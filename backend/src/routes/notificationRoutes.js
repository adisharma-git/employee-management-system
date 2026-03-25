const express = require('express');
const { getMyNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

router.use(authenticate); 

router.get('/', checkPermission(PERMISSIONS.VIEW_NOTIFICATIONS), getMyNotifications);
router.patch('/read-all', checkPermission(PERMISSIONS.VIEW_NOTIFICATIONS), markAllAsRead);
router.patch('/:id/read', checkPermission(PERMISSIONS.VIEW_NOTIFICATIONS), markAsRead);

module.exports = router;