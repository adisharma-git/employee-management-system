const prisma = require('../utils/prisma');
const { calculateAppliedDays } = require('../utils/leaveCalculator');

exports.applyForLeave = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { leaveType, description, startDate, endDate, isHalfDay } = req.body;

    // 1. Get Employee Record
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    // 2. Fetch Holidays within the date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const holidays = await prisma.holiday.findMany({
      where: {
        date: {
          gte: start, // Greater than or equal to startDate
          lte: end    // Less than or equal to endDate
        }
      }
    });

    // 3. Run the Math Engine (Skip weekends & holidays)
    const appliedDays = calculateAppliedDays(start, end, holidays, isHalfDay || false);

    // If they applied on a weekend/holiday and the result is 0
    if (appliedDays <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid date range. Leaves cannot be applied exclusively on weekends or holidays." 
      });
    }

    // 4. Check the Employee's Leave Balance
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        employeeId_leaveType: {
          employeeId: employee.id,
          leaveType: leaveType
        }
      }
    });

    if (!balance) {
      return res.status(400).json({ 
        success: false, 
        message: `You do not have a balance allocated for '${leaveType}' leaves.` 
      });
    }

    const remainingLeaves = balance.allocated - balance.used;

    // 5. Block if they don't have enough days left
    if (appliedDays > remainingLeaves) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient balance. You requested ${appliedDays} days, but only have ${remainingLeaves} days left.` 
      });
    }

    // 6. Save the Request to the Database (Status defaults to 'pending')
    const leaveRequest = await prisma.leave.create({
      data: {
        employeeId: employee.id,
        leaveType: leaveType,
        fromDate: start,
        toDate: end,
        reason: description,
        isHalfDay: isHalfDay || false,
        appliedDays: appliedDays
      }
    });

    // 7. Send the exact response requested by the Frontend
    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully.",
      data: {
        leaveType: leaveRequest.leaveType,
        description: leaveRequest.reason,
        startDate: leaveRequest.fromDate,
        endDate: leaveRequest.toDate,
        status: leaveRequest.status,
        numberOfLeavesTaken: leaveRequest.appliedDays,
        leavesRemaining: remainingLeaves - leaveRequest.appliedDays
      }
    });

  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET MY LEAVE BALANCES (Employee)

exports.getMyBalances = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // 1. Get Employee
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found." });

    // 2. Fetch all balances for this employee
    const balances = await prisma.leaveBalance.findMany({
      where: { employeeId: employee.id },
      select: {
        leaveType: true,
        allocated: true,
        used: true
      }
    });

    // 3. Format the data to easily show "remaining" for the frontend
    const formattedBalances = balances.map(b => ({
      leaveType: b.leaveType,
      allocated: b.allocated,
      used: b.used,
      remaining: b.allocated - b.used
    }));

    res.json({
      success: true,
      data: formattedBalances
    });

  } catch (error) {
    console.error("Get Balances Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// 3. GET MY LEAVE HISTORY (Employee)

exports.getMyLeaves = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get Employee
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found." });

    // 2. Fetch all leave applications made by this employee
    const leaves = await prisma.leave.findMany({
      where: { employeeId: employee.id },
      orderBy: { createdAt: 'desc' }, // Show newest applications first
      select: {
        id: true,
        leaveType: true,
        reason: true,
        fromDate: true,
        toDate: true,
        isHalfDay: true,
        appliedDays: true,
        status: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      count: leaves.length,
      data: leaves
    });

  } catch (error) {
    console.error("Get Leaves Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ==========================================
// 4. GET ALL LEAVES (Admin)
// ==========================================
exports.getAllLeaves = async (req, res) => {
  try {
    const { status } = req.query; // E.g., ?status=pending

    // Build the filter
    const whereClause = {};
    if (status) {
      whereClause.status = status.toLowerCase();
    }

    const leaves = await prisma.leave.findMany({
      where: whereClause,
      include: {
        employee: {
          select: { name: true, department: true, designation: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: leaves.length,
      data: leaves
    });

  } catch (error) {
    console.error("Get All Leaves Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 5. APPROVE / REJECT LEAVE (Admin)

exports.updateLeaveStatus = async (req, res) => {
  try {
    const adminId = req.user.id; // From verifyAdmin middleware
    const { id } = req.params;   // The Leave Request ID
    const { status } = req.body; // 'approved' or 'rejected'

    // 1. Validate Input
    if (!['approved', 'rejected'].includes(status.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Status must be 'approved' or 'rejected'." });
    }

    // 2. Find the Leave Request
    const leave = await prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave request not found." });
    }

    if (leave.status !== 'pending') {
      return res.status(400).json({ success: false, message: `This leave has already been ${leave.status}.` });
    }

    // 3. Database Transaction (Ensure both operations succeed or fail together)
    const transaction = [];

    // Step A: Update the Leave Request Status
    transaction.push(
      prisma.leave.update({
        where: { id },
        data: { 
          status: status.toLowerCase(),
          approvedBy: adminId 
        }
      })
    );

    // Step B: If Approved, deduct the balance from the "Bank"
    if (status.toLowerCase() === 'approved') {
      transaction.push(
        prisma.leaveBalance.update({
          where: {
            employeeId_leaveType: {
              employeeId: leave.employeeId,
              leaveType: leave.leaveType
            }
          },
          data: {
            used: { increment: leave.appliedDays } // Safely adds the days to the "used" column
          }
        })
      );
    }

    // Execute the transaction
    await prisma.$transaction(transaction);

    res.json({
      success: true,
      message: `Leave request successfully ${status}.`
    });

  } catch (error) {
    console.error("Update Leave Status Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};