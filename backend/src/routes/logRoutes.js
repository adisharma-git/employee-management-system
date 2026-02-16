const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware'); 
const { addLog, updateLogItem, deleteLogItem, getLogs } = require('../controllers/logController');

const router = express.Router();

// 1. GET /api/logs
router.get('/', verifyToken, getLogs);

// 2. POST /api/logs/add
router.post('/add', verifyToken, addLog);

// 3. PUT /api/logs/update
router.put('/update', verifyToken, updateLogItem);

// 4. DELETE /api/logs/delete
router.delete('/delete', verifyToken, deleteLogItem);

module.exports = router;