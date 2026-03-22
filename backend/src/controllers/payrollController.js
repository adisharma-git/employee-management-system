const prisma = require('../utils/prisma');

// 1. SET SALARY STRUCTURE (Admin Only)
exports.setSalaryStructure = async (req, res) => {
  try {
    const { employeeId, baseSalary, allowances, taxRate } = req.body;
    const parsedBaseSalary = parseFloat(baseSalary);
    const parsedAllowances = parseFloat(allowances || 0);
    const parsedTaxRate = parseFloat(taxRate || 0);

    if (!employeeId || Number.isNaN(parsedBaseSalary) || parsedBaseSalary <= 0) {
      return res.status(400).json({ success: false, message: "Employee ID and Base Salary are required." });
    }

    // Upsert will create it if it doesn't exist, or update it if it does
    const structure = await prisma.salaryStructure.upsert({
      where: { employeeId: employeeId },
      update: { baseSalary: parsedBaseSalary, allowances: parsedAllowances, taxRate: parsedTaxRate },
      create: { employeeId, baseSalary: parsedBaseSalary, allowances: parsedAllowances, taxRate: parsedTaxRate }
    });

    res.status(200).json({ success: true, message: "Salary structure updated.", data: structure });
  } catch (error) {
    console.error("Set Salary Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GENERATE MONTHLY PAYROLL (Admin Only)
exports.generateMonthlyPayroll = async (req, res) => {
  try {
    const month = parseInt(req.body.month, 10);
    const year = parseInt(req.body.year, 10);

    if (!month || !year) {
      return res.status(400).json({ success: false, message: "Month and Year are required." });
    }

    // 1. Calculate actual days in the month
    const totalDaysInMonth = new Date(year, month, 0).getDate();
    
    // Create UTC boundaries for database queries
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));

    // 2. Fetch all employees who have a salary structure defined
    const employees = await prisma.employee.findMany({
      include: { salaryStructure: true }
    });

    let createdCount = 0;
    let updatedCount = 0;
    const errors = [];

    for (const emp of employees) {
      if (!emp.salaryStructure) {
        errors.push(`Skipped ${emp.name} (No Salary Structure)`);
        continue;
      }

      // 3. Calculate Loss of Pay (LOP) Days from Attendance
      const absences = await prisma.attendance.count({
        where: { employeeId: emp.id, date: { gte: startOfMonth, lt: endOfMonth }, status: 'absent' }
      });
      const halfDays = await prisma.attendance.count({
        where: { employeeId: emp.id, date: { gte: startOfMonth, lt: endOfMonth }, status: 'half-day' }
      });

      const lopDays = absences + (halfDays * 0.5);
      const payableDays = totalDaysInMonth - lopDays;

      // 4. The Math Engine
      const { baseSalary, allowances, taxRate } = emp.salaryStructure;
      
      const proratedBase = (baseSalary / totalDaysInMonth) * payableDays;
      const grossEarnings = proratedBase + allowances;
      const taxDeduction = grossEarnings * (taxRate / 100);
      const netPay = grossEarnings - taxDeduction;

      const payrollPayload = {
        employeeId: emp.id,
        month,
        year,
        basicSalary: baseSalary,
        allowances,
        totalDays: totalDaysInMonth,
        payableDays,
        lopDays,
        grossEarnings: parseFloat(grossEarnings.toFixed(2)),
        taxDeduction: parseFloat(taxDeduction.toFixed(2)),
        netPay: parseFloat(netPay.toFixed(2))
      };

      const existingPayroll = await prisma.payrollRecord.findUnique({
        where: { employeeId_month_year: { employeeId: emp.id, month, year } }
      });

      await prisma.payrollRecord.upsert({
        where: { employeeId_month_year: { employeeId: emp.id, month, year } },
        update: payrollPayload,
        create: payrollPayload
      });

      if (existingPayroll) {
        updatedCount += 1;
      } else {
        createdCount += 1;
      }
    }

    res.status(200).json({
      success: true,
      message: `Payroll processed for ${createdCount + updatedCount} employees (${createdCount} created, ${updatedCount} updated).`,
      createdCount,
      updatedCount,
      skipped: errors
    });

  } catch (error) {
    console.error("Generate Payroll Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. GET MY PAYSLIPS (Employee View)
exports.getMyPayslips = async (req, res) => {
  try {
    const userId = req.user.id;
    const employee = await prisma.employee.findUnique({ where: { userId } });

    if (!employee) return res.status(404).json({ success: false, message: "Employee not found." });

    const payslips = await prisma.payrollRecord.findMany({
      where: { employeeId: employee.id },
      orderBy: [ { year: 'desc' }, { month: 'desc' } ]
    });

    res.status(200).json({ success: true, count: payslips.length, data: payslips });
  } catch (error) {
    console.error("Get Payslips Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 4. GET COMPANY PAYROLL (Admin View)
exports.getCompanyPayroll = async (req, res) => {
  try {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    if (!month || !year) return res.status(400).json({ success: false, message: "Month and year query params required." });

    const records = await prisma.payrollRecord.findMany({
      where: { month, year },
      include: {
        employee: { select: { name: true, department: true, designation: true } }
      }
    });

    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    console.error("Get Company Payroll Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 5. GET EMPLOYEES WITHOUT SALARY (Admin View)
exports.getUnassignedEmployees = async (req, res) => {
  try {
    // Find all employees where the salaryStructure relation is null
    const employees = await prisma.employee.findMany({
      where: { salaryStructure: null },
      select: {
        id: true,
        name: true,
        department: true,
        designation: true,
        user: { select: { email: true } }
      }
    });

    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};