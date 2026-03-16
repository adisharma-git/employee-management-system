const express = require('express');
const { createHoliday, getUpcomingHolidays } = require('../controllers/holidayController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, createHoliday);
router.get('/upcoming-holidays', verifyToken, getUpcomingHolidays);

module.exports = router;