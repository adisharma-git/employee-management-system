const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { getAllEmployees, createEmployee } = require('../controllers/adminController');

const router = express.Router();

// Apply security to ALL routes in this file
// 1. Must be Logged In (verifyToken)
// 2. Must be Admin (verifyAdmin)
router.use(verifyToken, verifyAdmin);

// GET /api/admin/employees -> View the list
router.get('/employees', getAllEmployees);

// POST /api/admin/employees -> Create a new one
router.post('/employees', createEmployee);

module.exports = router;