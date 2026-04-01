const express = require('express');
const { createHoliday, getUpcomingHolidays } = require('../controllers/holidayController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const router = express.Router();

router.post('/', authenticate, checkPermission(PERMISSIONS.CREATE_HOLIDAYS), createHoliday);
router.get('/upcoming-holidays', authenticate, checkPermission(PERMISSIONS.VIEW_HOLIDAYS), getUpcomingHolidays);

module.exports = router;