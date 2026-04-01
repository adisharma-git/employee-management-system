const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', authenticate, logout);

module.exports = router;