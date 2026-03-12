const prisma = require('../utils/prisma');

// 1. CREATE LEAVE TYPE & ASSIGN TO ALL (Admin)
exports.createLeaveType = async (req, res) => {
  try {
    const { name, defaultDays, description } = req.body;

    // 1. Check if it already exists
    const existingType = await prisma.leaveType.findUnique({ where: { name } });
    if (existingType) {
      return res.status(400).json({ success: false, message: "Leave type already exists." });
    }

    // 2. Transaction: Create the rule AND distribute it to everyone
    const result = await prisma.$transaction(async (tx) => {
      
      // A. Create the new Master Leave Type
      const newLeaveType = await tx.leaveType.create({
        data: { name, defaultDays, description }
      });

      // B. Find ALL existing employees in the company
      const allEmployees = await tx.employee.findMany({
        select: { id: true }
      });

      // C. If there are employees, give them this new leave balance immediately
      if (allEmployees.length > 0) {
        const balancesToAssign = allEmployees.map(emp => ({
          employeeId: emp.id,
          leaveTypeId: newLeaveType.id,
          allocated: defaultDays,
          used: 0
        }));

        // Bulk insert the new bank accounts
        await tx.leaveBalance.createMany({
          data: balancesToAssign
        });
      }

      return newLeaveType;
    });

    res.status(201).json({
      success: true,
      message: `Leave type '${name}' created and assigned to all existing employees.`,
      data: result
    });

  } catch (error) {
    console.error("Create Leave Type Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET ACTIVE LEAVE TYPES
exports.getActiveLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await prisma.leaveType.findMany({
      where: { isActive: true },
      select: { id: true, name: true, defaultDays: true, description: true }
    });

    res.json({ success: true, data: leaveTypes });
  } catch (error) {
    console.error("Get Leave Types Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};