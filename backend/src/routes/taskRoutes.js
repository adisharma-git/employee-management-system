const express = require('express');
const { createTask, updateTaskStatus, getMyTasks } = require('../controllers/taskController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Employee routes
router.get('/my-tasks', verifyToken, getMyTasks);

// Kanban drag-and-drop route
router.patch('/:id/status', verifyToken, updateTaskStatus);

// Admin routes
router.post('/', verifyToken, verifyAdmin, createTask);

module.exports = router;