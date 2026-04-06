const express = require('express');
const { authenticate } = require('../middleware/auth');
const { updateProfile, getProfile } = require('../controllers/employeeController');

const router = express.Router();

// GET /api/employee/me  -> See my own details
router.get('/me', authenticate, getProfile);

// PUT /api/employee/update -> Fill my details
router.put('/update', authenticate, updateProfile);

module.exports = router;