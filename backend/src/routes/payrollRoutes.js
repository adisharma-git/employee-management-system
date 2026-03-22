const express = require('express');
const { setSalaryStructure, generateMonthlyPayroll, getMyPayslips, getCompanyPayroll, getUnassignedEmployees } = require('../controllers/payrollController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// ADMIN ROUTES (Requires Admin privileges)
router.post('/structure', verifyToken, verifyAdmin, setSalaryStructure);
router.post('/generate', verifyToken, verifyAdmin, generateMonthlyPayroll);
router.get('/company', verifyToken, verifyAdmin, getCompanyPayroll);
router.get('/unassigned', verifyToken, verifyAdmin, getUnassignedEmployees);

// EMPLOYEE ROUTES 
router.get('/my-payslips', verifyToken, getMyPayslips);

module.exports = router;