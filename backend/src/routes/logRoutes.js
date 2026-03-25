const express = require('express');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');
const { addLog, updateLogItem, deleteLogItem, getLogs } = require('../controllers/logController');

const router = express.Router();

// 1. GET /api/logs
router.get('/', authenticate, checkPermission(PERMISSIONS.VIEW_DAILY_LOGS), getLogs);

// 2. POST /api/logs/add
router.post('/add', authenticate, checkPermission(PERMISSIONS.CREATE_DAILY_LOG), addLog);

// 3. PUT /api/logs/update
router.put('/update', authenticate, checkPermission(PERMISSIONS.EDIT_DAILY_LOG), updateLogItem);

// 4. DELETE /api/logs/delete
router.delete('/delete', authenticate, checkPermission(PERMISSIONS.EDIT_DAILY_LOG), deleteLogItem);

module.exports = router;