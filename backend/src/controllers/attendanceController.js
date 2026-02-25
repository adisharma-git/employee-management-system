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
      select: { id: true, name: true, department: true, designation: true }
    });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee record not found' });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance
    const attendance = await prisma.attendance.findFirst({
      where: { employeeId: employee.id, date: today },
      select: {
        id: true,
        status: true,
        checkInTime: true,
        checkOutTime: true,
        date: true,
        totalBreakMinutes: true, 
        breakHistory: true       
      }
    });

    // Determine status and math
    const isPunchedIn = attendance && attendance.checkInTime && !attendance.checkOutTime;
    
    // Calculate break times to send on initial load
    const totalBreakTime = attendance ? attendance.totalBreakMinutes : 0;
    const leftBreakTime = Math.max(0, 40 - totalBreakTime);

    res.json({
      success: true,
      data: {
        isPunchedIn: isPunchedIn,
        employee: employee,
        todayAttendance: attendance || null,
        breakStats: {
          totalBreakTime: totalBreakTime,
          leftBreakTime: leftBreakTime
        }
      }
    });

  } catch (error) {
    console.error('Get Punch Status Error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching punch status', error: error.message });
  }
};

// ==========================================
// 3. TOGGLE BREAK (Start / End)
// ==========================================
exports.toggleBreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isStarting } = req.body; // Expecting boolean: true (start) or false (end)

    // Validate boolean input
    if (typeof isStarting !== 'boolean') {
      return res.status(400).json({ message: "Invalid payload. Please send { 'isStarting': true } or false." });
    }

    // 1. Get Employee
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // 2. Get Today's Attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
      where: { employeeId: employee.id, date: today }
    });

    if (!attendance) return res.status(400).json({ message: "You must Check-In first!" });
    if (attendance.checkOutTime) return res.status(400).json({ message: "You have already Checked Out." });

    // 3. Handle START BREAK (isStarting === true)
    if (isStarting === true) {
      if (attendance.status === 'break') return res.status(400).json({ message: "You are already on break!" });
      
      // Check Limit (40 mins)
      if (attendance.totalBreakMinutes >= 40) {
        return res.status(400).json({ message: "Break limit (40 mins) exhausted for today." });
      }

      // Add new break entry
      const currentHistory = attendance.breakHistory || [];
      const newBreak = { start: new Date(), end: null }; 
      
      await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          status: 'break',
          breakHistory: [...currentHistory, newBreak]
        }
      });

      return res.json({ success: true, message: "Break Started", status: "break" });
    }

    // 4. Handle END BREAK (isStarting === false)
    if (isStarting === false) {
      if (attendance.status !== 'break') return res.status(400).json({ message: "You are not on break." });

      const currentHistory = attendance.breakHistory || [];
      const lastBreak = currentHistory[currentHistory.length - 1];

      // Calculate Duration
      const startTime = new Date(lastBreak.start);
      const endTime = new Date();
      const durationMinutes = Math.floor((endTime - startTime) / 60000); // Convert ms to mins

      // Calculate the new totals for the frontend
      const newTotalBreakTime = attendance.totalBreakMinutes + durationMinutes;
      const leftBreakTime = 40 - newTotalBreakTime;

      // Update the last entry with end time
      lastBreak.end = endTime;
      currentHistory[currentHistory.length - 1] = lastBreak;

      await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          status: 'present',
          breakHistory: currentHistory,
          totalBreakMinutes: newTotalBreakTime
        }
      });

      return res.json({ 
        success: true, 
        message: `Break Ended. Used: ${durationMinutes} mins. Total: ${newTotalBreakTime}/40 mins.`,
        data: {
          totalBreakTime: newTotalBreakTime,
          leftBreakTime: leftBreakTime < 0 ? 0 : leftBreakTime // Ensures it doesn't show negative minutes if they overstayed
        }
      });
    }

  } catch (error) {
    console.error("Break Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ==========================================
// 4. GET MY ATTENDANCE (Employee View)
// ==========================================
exports.getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const employee = await prisma.employee.findUnique({ where: { userId } });

    const history = await prisma.attendance.findMany({
      where: { employeeId: employee.id },
      orderBy: { date: 'desc' },
      take: 30 // Last 30 days only
    });

    res.json({ success: true, count: history.length, data: history });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// 5. GET ALL ATTENDANCE (Admin View)
// ==========================================
exports.getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query; // Allow filtering by date ?date=2024-02-20

    const whereClause = {};
    if (date) {
      whereClause.date = new Date(date);
    }

    const allRecords = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        employee: {
          select: { name: true, department: true, designation: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    res.json({ success: true, count: allRecords.length, data: allRecords });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};