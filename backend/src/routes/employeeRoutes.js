const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware'); 
const { updateProfile, getProfile } = require('../controllers/employeeController');

const router = express.Router();

// GET /api/employee/me  -> See my own details
router.get('/me', verifyToken, getProfile);

// PUT /api/employee/update -> Fill my details
router.put('/update', verifyToken, updateProfile);

module.exports = router;