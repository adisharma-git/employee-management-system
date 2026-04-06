const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res, next) => {
	if (process.env.ENABLE_SELF_REGISTRATION !== 'true') {
		return res.status(403).json({
			success: false,
			message: 'Self registration is disabled.'
		});
	}

	return register(req, res, next);
});

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/logout
router.post('/logout', authenticate, logout);

module.exports = router;