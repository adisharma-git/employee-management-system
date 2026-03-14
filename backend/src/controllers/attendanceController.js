const prisma = require('../utils/prisma');
const DEV_MODE = process.env.NODE_ENV !== 'production' && process.env.ATTENDANCE_DEV_MODE === 'true';

const getUtcDayStart = (inputDate = new Date()) => {
  return new Date(Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    0,
    0,
    0,
    0
  ));
};

const getUtcDayRange = (inputDate = new Date()) => {
  const start = getUtcDayStart(inputDate);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
};

const parseTimeOnCurrentUtcDate = (timeString, inputDate = new Date()) => {
  if (!timeString) return null;
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return new Date(Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    hours || 0,
    minutes || 0,
    seconds || 0,
    0
  ));
};

const formatDateOnly = (value) => {
  if (!value) return value;
  return new Date(value).toISOString().split('T')[0];
};

const serializeAttendance = (attendance) => {
  if (!attendance) return attendance;
  return {
    ...attendance,
    date: formatDateOnly(attendance.date)
  };
};

const mapAttendanceHistoryEntry = (attendance) => {
  const normalized = serializeAttendance(attendance);
  const totalBreakTime = normalized.totalBreakMinutes || 0;

  return {
    ...normalized,
    punchedInTime: normalized.checkInTime,
    punchedOutTime: normalized.checkOutTime,
    presentStatus: normalized.status,
    breakHistory: Array.isArray(normalized.breakHistory) ? normalized.breakHistory : [],
    breakStats: {
      totalBreakTime,
      leftBreakTime: Math.max(0, 40 - totalBreakTime)
    }
  };
};

const findTodayAttendance = async (employeeId, inputDate = new Date(), select, include) => {
  const { start, end } = getUtcDayRange(inputDate);
  return prisma.attendance.findFirst({
    where: {
      employeeId,
      date: {
        gte: start,
        lt: end
      }
    },
    ...(select ? { select } : {}),
    ...(include ? { include } : {})
  });
};
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
    const today = getUtcDayStart();

    // Step 3: Check if attendance already marked for today
    const existingAttendance = await findTodayAttendance(employee.id);

    if (existingAttendance) {
      if (DEV_MODE) {
        // DEV MODE: Reset today's record so they can test again
        const resetAttendance = await prisma.attendance.update({
          where: { id: existingAttendance.id },
          data: {
            status: status || 'present',
            checkInTime: new Date(), 
            checkOutTime: null,       // Clear previous checkout
            breakHistory: [],         // Clear previous breaks
            totalBreakMinutes: 0      // Reset break counter
          }
        });
        return res.status(201).json({ 
          success: true, 
          message: '[DEV MODE] Attendance reset for a new test run today!',
          data: serializeAttendance(resetAttendance)
        });
      }
      return res.status(400).json({ 
        success: false,
        message: 'Attendance already marked for today',
        data: serializeAttendance(existingAttendance)
      });
    }

    // Step 4: Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: employee.id,
        date: today,
        status: status || 'present',
        checkInTime: checkInTime ? parseTimeOnCurrentUtcDate(checkInTime) : new Date(),
        checkOutTime: checkOutTime ? parseTimeOnCurrentUtcDate(checkOutTime) : null
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
      data: serializeAttendance(attendance)
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
    const attendance = await findTodayAttendance(employee.id);

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
        checkOutTime: checkOutTime ? parseTimeOnCurrentUtcDate(checkOutTime) : new Date()
      }
    });

    res.json({
      success: true,
      message: 'Checked out successfully',
      data: serializeAttendance(updatedAttendance)
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
    const attendance = await findTodayAttendance(employee.id, new Date(), {
      id: true,
      status: true,
      checkInTime: true,
      checkOutTime: true,
      date: true,
      totalBreakMinutes: true, // ✅ NEW: Fetch total break minutes
      breakHistory: true       // ✅ NEW: Fetch break history just in case they need it
    });

    // Determine status and math
    const isPunchedIn = attendance && attendance.checkInTime && !attendance.checkOutTime;
    
    // ✅ NEW: Calculate break times to send on initial load
    const totalBreakTime = attendance ? attendance.totalBreakMinutes : 0;
    const leftBreakTime = Math.max(0, 40 - totalBreakTime); // Math.max prevents negative numbers

    res.json({
      success: true,
      data: {
        isPunchedIn: isPunchedIn,
        employee: employee,
        todayAttendance: attendance ? serializeAttendance(attendance) : null,
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
    const attendance = await findTodayAttendance(employee.id);

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

      if (!lastBreak || !lastBreak.start || lastBreak.end) {
        return res.status(400).json({ message: "Break state is invalid. Please start break first." });
      }

      // Calculate Duration
      const startTime = new Date(lastBreak.start);
      const endTime = new Date();
      const durationMinutes = Math.floor((endTime - startTime) / 60000); // Convert ms to mins

      // Calculate the new totals for the frontend
      const cappedDuration = Math.max(0, Math.min(durationMinutes, 40 - attendance.totalBreakMinutes));
      const newTotalBreakTime = attendance.totalBreakMinutes + cappedDuration;
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
        message: `Break Ended. Used: ${cappedDuration} mins. Total: ${newTotalBreakTime}/40 mins.`,
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
    const { date, fromDate, toDate } = req.query;
    const employee = await prisma.employee.findUnique({ where: { userId } });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee record not found' });
    }

    const whereClause = { employeeId: employee.id };

    if (date) {
      const parsedDate = new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid date. Use YYYY-MM-DD format.' });
      }

      const { start, end } = getUtcDayRange(parsedDate);
      whereClause.date = { gte: start, lt: end };
    } else if (fromDate || toDate) {
      const parsedFromDate = fromDate ? new Date(fromDate) : null;
      const parsedToDate = toDate ? new Date(toDate) : null;

      if (fromDate && Number.isNaN(parsedFromDate.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid fromDate. Use YYYY-MM-DD format.' });
      }
      if (toDate && Number.isNaN(parsedToDate.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid toDate. Use YYYY-MM-DD format.' });
      }

      const dateFilter = {};
      if (parsedFromDate) {
        dateFilter.gte = getUtcDayStart(parsedFromDate);
      }
      if (parsedToDate) {
        const toDayStart = getUtcDayStart(parsedToDate);
        const toDayEnd = new Date(toDayStart);
        toDayEnd.setUTCDate(toDayEnd.getUTCDate() + 1);
        dateFilter.lt = toDayEnd;
      }

      if (parsedFromDate && parsedToDate && dateFilter.gte >= dateFilter.lt) {
        return res.status(400).json({ success: false, message: 'fromDate must be earlier than or equal to toDate.' });
      }

      whereClause.date = dateFilter;
    }

    const history = await prisma.attendance.findMany({
      where: whereClause,
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    res.json({ success: true, count: history.length, data: history.map(mapAttendanceHistoryEntry) });
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
      const input = new Date(date);
      const { start, end } = getUtcDayRange(input);
      whereClause.date = {
        gte: start,
        lt: end
      };
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

    res.json({ success: true, count: allRecords.length, data: allRecords.map(serializeAttendance) });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};