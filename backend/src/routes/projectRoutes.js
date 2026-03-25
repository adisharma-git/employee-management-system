const express = require('express');
const { createProject, getAllProjects, getProjectBoard } = require('../controllers/projectController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

router.get('/', authenticate, checkPermission(PERMISSIONS.VIEW_PROJECTS), getAllProjects);
router.get('/:id', authenticate, checkPermission(PERMISSIONS.VIEW_PROJECTS), getProjectBoard);
router.post('/', authenticate, checkPermission(PERMISSIONS.CREATE_PROJECT), createProject);

module.exports = router;