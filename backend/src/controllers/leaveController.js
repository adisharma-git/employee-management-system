const prisma = require('../utils/prisma');
const { calculateAppliedDays } = require('../utils/leaveCalculator');

// 1. APPLY FOR LEAVE (Employee)
exports.applyForLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    // Frontend now sends leaveTypeId instead of leaveType string
    const { leaveTypeId, description, startDate, endDate, isHalfDay } = req.body;

    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found." });

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const holidays = await prisma.holiday.findMany({
      where: { date: { gte: start, lte: end } }
    });

    const appliedDays = calculateAppliedDays(start, end, holidays, isHalfDay || false);

    if (appliedDays <= 0) {
      return res.status(400).json({ success: false, message: "Invalid date range. Cannot apply exclusively on holidays/weekends." });
    }

    // Look up balance using the new relational ID, and include the Master Table data
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        employeeId_leaveTypeId: {
          employeeId: employee.id,
          leaveTypeId: leaveTypeId
        }
      },
      include: { leaveType: true } // Fetches the actual name (e.g., "Casual")
    });

    if (!balance) {
      return res.status(400).json({ success: false, message: "You do not have a balance allocated for this leave type." });
    }

    const remainingLeaves = balance.allocated - balance.used;

    if (appliedDays > remainingLeaves) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient balance. You requested ${appliedDays} days, but only have ${remainingLeaves} days left for ${balance.leaveType.name}.` 
      });
    }

    // Save the request with the relational ID
    const leaveRequest = await prisma.leave.create({
      data: {
        employeeId: employee.id,
        leaveTypeId: leaveTypeId,
        fromDate: start,
        toDate: end,
        reason: description,
        isHalfDay: isHalfDay || false,
        appliedDays: appliedDays
      },
      include: { leaveType: true } 
    });

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully.",
      data: {
        leaveType: leaveRequest.leaveType.name, 
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
    
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found." });

    // Fetch balances and include the Master Menu name
    const balances = await prisma.leaveBalance.findMany({
      where: { employeeId: employee.id },
      include: {
        leaveType: {
          select: { name: true } 
        }
      }
    });

    // Format the data perfectly for the frontend UI cards
    const formattedBalances = balances.map(b => ({
      leaveType: b.leaveType.name, 
      leaveTypeId: b.leaveTypeId,  
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
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        // Grabs just the text name from the master table
        leaveType: { select: { name: true } },
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

// 4. GET ALL LEAVES (Admin)
exports.getAllLeaves = async (req, res) => {
  try {
    const { status } = req.query; // E.g., ?status=pending

    const whereClause = {};
    if (status) {
      whereClause.status = status.toLowerCase();
    }

    const leaves = await prisma.leave.findMany({
      where: whereClause,
      include: {
        employee: {
          select: { name: true, department: true, designation: true }
        },
        // Ensures Admin sees the name of the leave in their inbox
        leaveType: {
          select: { name: true } 
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
    const adminId = req.user.id; 
    const { id } = req.params;   
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
            // Now uses the new relational index
            employeeId_leaveTypeId: {
              employeeId: leave.employeeId,
              leaveTypeId: leave.leaveTypeId 
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