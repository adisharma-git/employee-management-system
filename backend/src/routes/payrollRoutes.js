const express = require('express');
const { setSalaryStructure, generateMonthlyPayroll, getMyPayslips, getCompanyPayroll, getUnassignedEmployees } = require('../controllers/payrollController');
const { authenticate } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissionMiddleware');
const { PERMISSIONS } = require('../constants/permissions');

const router = express.Router();

// ADMIN ROUTES (Requires Admin privileges)
router.post('/structure', authenticate, checkPermission(PERMISSIONS.UPDATE_PAYROLL), setSalaryStructure);
router.post('/generate', authenticate, checkPermission(PERMISSIONS.GENERATE_PAYROLL), generateMonthlyPayroll);
router.get('/company', authenticate, checkPermission(PERMISSIONS.VIEW_PAYROLL), getCompanyPayroll);
router.get('/unassigned', authenticate, checkPermission(PERMISSIONS.VIEW_EMPLOYEES), getUnassignedEmployees);

// EMPLOYEE ROUTES 
router.get('/my-payslips', authenticate, checkPermission(PERMISSIONS.VIEW_PAYROLL), getMyPayslips);

module.exports = router;