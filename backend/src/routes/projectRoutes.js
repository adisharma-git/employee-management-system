const express = require('express');
const { createProject, getAllProjects, getProjectBoard } = require('../controllers/projectController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getAllProjects);
router.get('/:id', verifyToken, getProjectBoard);
router.post('/', verifyToken, verifyAdmin, createProject);

module.exports = router;