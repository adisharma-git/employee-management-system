const prisma = require('../utils/prisma');

// ==========================================
// 1. MARK ATTENDANCE (Check-In)
// ==========================================
exports.markAttendance = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { status, checkInTime, checkOutTime } = req.body;

    // Step 1: Get employee record from userId
    const employee = await prisma.employee.findUnique({
      where: { userId: userId }
    });

    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Employee record not found' 
      });
    }

    // Step 2: Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Step 3: Check if attendance already marked for today
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        date: today
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ 
        success: false,
        message: 'Attendance already marked for today',
        data: existingAttendance
      });
    }

    // Step 4: Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: employee.id,
        date: today,
        status: status || 'present',
        checkInTime: checkInTime ? new Date(`1970-01-01T${checkInTime}`) : new Date(),
        checkOutTime: checkOutTime ? new Date(`1970-01-01T${checkOutTime}`) : null
      },
      include: {
        employee: {
          select: {
            name: true,
            department: true,
            designation: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance
    });

  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while marking attendance',
      error: error.message 
    });
  }
};

// ==========================================
// 2. UPDATE CHECKOUT TIME
// ==========================================
exports.updateCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { checkOutTime } = req.body;

    // Get employee
    const employee = await prisma.employee.findUnique({
      where: { userId: userId }
    });

    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Employee record not found' 
      });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance
    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        date: today
      }
    });

    if (!attendance) {
      return res.status(404).json({ 
        success: false,
        message: 'No attendance record found for today. Please check-in first.' 
      });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ 
        success: false,
        message: 'Already checked out for today' 
      });
    }

    // Update checkout time
    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOutTime: checkOutTime ? new Date(`1970-01-01T${checkOutTime}`) : new Date()
      }
    });

    res.json({
      success: true,
      message: 'Checked out successfully',
      data: updatedAttendance
    });

  } catch (error) {
    console.error('Update Checkout Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating checkout',
      error: error.message 
    });
  }
};

// ==========================================
// GET PUNCH STATUS (for Dashboard Profile)
// ==========================================

exports.getPunchStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get employee
    const employee = await prisma.employee.findUnique({
      where: { userId: userId },
      select: {
        id: true,
        name: true,
        department: true,
        designation: true
      }
    });

    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Employee record not found' 
      });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance
    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        date: today
      },
      select: {
        id: true,
        status: true,
        checkInTime: true,
        checkOutTime: true,
        date: true
      }
    });

    // Determine punch status
    const isPunchedIn = attendance && attendance.checkInTime && !attendance.checkOutTime;

    res.json({
      success: true,
      data: {
        isPunchedIn: isPunchedIn,
        employee: {
          id: employee.id,
          name: employee.name,
          department: employee.department,
          designation: employee.designation
        },
        todayAttendance: attendance || null
      }
    });

  } catch (error) {
    console.error('Get Punch Status Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching punch status',
      error: error.message 
    });
  }
};