const express = require('express');
const { createTask, updateTaskStatus, getMyTasks } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

// Employee routes
router.get('/my-tasks', authenticate, checkPermission(PERMISSIONS.VIEW_TASKS), getMyTasks);

// Kanban drag-and-drop route
router.patch('/:id/status', authenticate, checkPermission(PERMISSIONS.UPDATE_TASK_STATUS), updateTaskStatus);

// Admin routes
router.post('/', authenticate, checkPermission(PERMISSIONS.CREATE_TASK), createTask);

module.exports = router;