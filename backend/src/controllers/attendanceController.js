const prisma = require('../utils/prisma');
const DEV_MODE = process.env.NODE_ENV !== 'production' && process.env.ATTENDANCE_DEV_MODE === 'true';
const { sendMail, emailTemplates } = require('../utils/emailService.js'); // ✅ IMPORT ADDED

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

// 1. MARK ATTENDANCE (Check-In)
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

    // 15-Minute Late Penalty Logic 
    const actualCheckIn = checkInTime ? parseTimeOnCurrentUtcDate(checkInTime) : new Date();

    // 1. Define Company Policy Variables
    const SHIFT_START_HOUR = 10; // 10 represents 10:00 AM
    const GRACE_PERIOD_MINS = 15; // 15 minutes of grace

    // 2. Convert server UTC time to IST (India Standard Time is UTC + 5.5 hours)
    const istTime = new Date(actualCheckIn.getTime() + (5.5 * 60 * 60 * 1000));
    const currentHourIST = istTime.getUTCHours();
    const currentMinuteIST = istTime.getUTCMinutes();

    // 3. Determine the status
    let finalStatus = status || 'present'; 

    // Enforce the penalty if past 10:15 AM
    if (currentHourIST > SHIFT_START_HOUR || (currentHourIST === SHIFT_START_HOUR && currentMinuteIST > GRACE_PERIOD_MINS)) {
      finalStatus = 'half-day'; 
    }

    // Step 4: Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        employeeId: employee.id,
        date: today,
        status: finalStatus, // ✅ Uses the calculated status
        checkInTime: actualCheckIn,
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
      message: finalStatus === 'half-day' 
        ? 'Checked in late. Attendance automatically marked as Half-Day.' 
        : 'Attendance marked successfully',
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

// 2. UPDATE CHECKOUT TIME
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

// GET PUNCH STATUS (for Dashboard Profile)
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

// 3. TOGGLE BREAK (Start / End)
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

// 4. GET MY ATTENDANCE (Employee View)
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

// 5. GET ALL ATTENDANCE (Admin View)
exports.getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query; 

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

// 6. GET MONTHLY SUMMARY (Admin View)
exports.getMonthlySummary = async (req, res) => {
  try {
    const today = new Date();
    const month = req.query.month ? parseInt(req.query.month) : today.getUTCMonth() + 1;
    const year = req.query.year ? parseInt(req.query.year) : today.getUTCFullYear();

    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const startOfNextMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));

    const records = await prisma.attendance.findMany({
      where: { date: { gte: startOfMonth, lt: startOfNextMonth } },
      include: {
        employee: { select: { name: true, department: true, designation: true } }
      }
    });

    const summaryMap = {};

    records.forEach(record => {
      const empId = record.employeeId;
      
      if (!summaryMap[empId]) {
        summaryMap[empId] = {
          employeeId: empId,
          name: record.employee.name,
          department: record.employee.department,
          designation: record.employee.designation,
          present: 0,
          absent: 0,
          halfDay: 0,
          onLeave: 0,
          totalLoggedDays: 0
        };
      }

      const status = record.status.toLowerCase();
      if (status === 'present') summaryMap[empId].present++;
      else if (status === 'absent') summaryMap[empId].absent++;
      else if (status === 'half-day' || status === 'halfday') summaryMap[empId].halfDay++;
      else if (status === 'leave' || status === 'on-leave') summaryMap[empId].onLeave++;
      
      summaryMap[empId].totalLoggedDays++;
    });

    // Calculate the percentage for each employee
    const finalData = Object.values(summaryMap).map(emp => {
      // Prevent division by zero if they have no days logged yet
      const safeTotal = emp.totalLoggedDays > 0 ? emp.totalLoggedDays : 1; 
      
      // Calculate points (Present = 1, Leave = 1, Half-Day = 0.5)
      const points = emp.present + emp.onLeave + (emp.halfDay * 0.5);
      
      // Convert to a percentage with 1 decimal place (e.g., 95.5)
      const percentage = ((points / safeTotal) * 100).toFixed(1);

      return {
        ...emp,
        attendancePercentage: parseFloat(percentage) 
      };
    });

    res.json({
      success: true,
      month: month,
      year: year,
      count: finalData.length,
      data: finalData
    });

  } catch (error) {
    console.error("Monthly Summary Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 7. GET MY MONTHLY SUMMARY (Employee View)

exports.getMyMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id; 

    const employee = await prisma.employee.findUnique({
      where: { userId: userId }
    });

    if (!employee) return res.status(404).json({ success: false, message: 'Employee record not found' });

    const today = new Date();
    const month = req.query.month ? parseInt(req.query.month) : today.getUTCMonth() + 1;
    const year = req.query.year ? parseInt(req.query.year) : today.getUTCFullYear();

    const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const startOfNextMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));

    const records = await prisma.attendance.findMany({
      where: {
        employeeId: employee.id, 
        date: { gte: startOfMonth, lt: startOfNextMonth }
      }
    });

    const summary = {
      present: 0,
      absent: 0,
      halfDay: 0,
      onLeave: 0,
      totalLoggedDays: 0
    };

    records.forEach(record => {
      const status = record.status.toLowerCase();
      if (status === 'present') summary.present++;
      else if (status === 'absent') summary.absent++;
      else if (status === 'half-day' || status === 'halfday') summary.halfDay++;
      else if (status === 'leave' || status === 'on-leave') summary.onLeave++;
      
      summary.totalLoggedDays++;
    });

    // ✅ NEW: Calculate the employee's personal percentage
    const safeTotal = summary.totalLoggedDays > 0 ? summary.totalLoggedDays : 1;
    const points = summary.present + summary.onLeave + (summary.halfDay * 0.5);
    const percentage = ((points / safeTotal) * 100).toFixed(1);
    
    summary.attendancePercentage = parseFloat(percentage);

    res.json({
      success: true,
      month: month,
      year: year,
      data: summary
    });

  } catch (error) {
    console.error("My Monthly Summary Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 8. AUTO-MARK ABSENTEES (The Night Shift Cron Job)
exports.markAbsentees = async (req, res) => {
  try {
    // 1. Determine "Today" in UTC
    const today = new Date();
    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const endOfToday = new Date(startOfToday);
    endOfToday.setUTCDate(endOfToday.getUTCDate() + 1);

    // 2. Is it the Weekend? (0 = Sunday, 6 = Saturday)
    const dayOfWeek = startOfToday.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(200).json({ message: "Weekend. No absentees marked." });
    }

    // 3. Is it a Company Holiday?
    const isHoliday = await prisma.holiday.findFirst({
      where: { date: startOfToday }
    });
    if (isHoliday) {
      return res.status(200).json({ message: "Holiday today. No absentees marked." });
    }

    // 4. Get everyone who ALREADY has an attendance record today
    const todaysAttendance = await prisma.attendance.findMany({
      where: { date: { gte: startOfToday, lt: endOfToday } },
      select: { employeeId: true }
    });
    const presentEmployeeIds = todaysAttendance.map(a => a.employeeId);

    // 5. Get everyone who is on an APPROVED LEAVE today
    const activeLeaves = await prisma.leave.findMany({
      where: {
        status: 'approved',
        fromDate: { lte: startOfToday },
        toDate: { gte: startOfToday } // If today falls between their leave start and end dates
      },
      select: { employeeId: true }
    });
    const leaveEmployeeIds = activeLeaves.map(l => l.employeeId);

    // 6. Combine the lists of people who are "Excused" for the day
    const excusedEmployeeIds = [...presentEmployeeIds, ...leaveEmployeeIds];

    // 7. Find all employees who are NOT excused
    const missingEmployees = await prisma.employee.findMany({
      where: {
        id: { notIn: excusedEmployeeIds }
      },
      select: { id: true }
    });

    if (missingEmployees.length === 0) {
      return res.status(200).json({ message: "Everyone is accounted for today!" });
    }

    // 8. Create "Absent" records for the missing employees
    const absentRecords = missingEmployees.map(emp => ({
      employeeId: emp.id,
      date: startOfToday,
      status: 'absent'
    }));

    // skipDuplicates ensures we don't accidentally mark someone absent twice
    const result = await prisma.attendance.createMany({
      data: absentRecords,
      skipDuplicates: true 
    });

    res.status(200).json({
      success: true,
      message: `Night Shift Complete. Marked ${result.count} employees as absent.`
    });

  } catch (error) {
    console.error("Auto-Absent Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 9. REMINDER: FORGOT CHECK-IN
exports.remindCheckIn = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const endOfToday = new Date(startOfToday);
    endOfToday.setUTCDate(endOfToday.getUTCDate() + 1);

    // Skip weekends
    const dayOfWeek = startOfToday.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return res.status(200).json({ message: "Weekend. No check-in needed." });

    // Skip holidays
    const isHoliday = await prisma.holiday.findFirst({ where: { date: startOfToday } });
    if (isHoliday) return res.status(200).json({ message: "Holiday. No check-in needed." });

    // 1. Find everyone checked in today or on approved leave
    const present = await prisma.attendance.findMany({ where: { date: { gte: startOfToday, lt: endOfToday } } });
    const leaves = await prisma.leave.findMany({ 
      where: { status: 'approved', fromDate: { lte: startOfToday }, toDate: { gte: startOfToday } } 
    });
    
    const excusedIds = [...present.map(p => p.employeeId), ...leaves.map(l => l.employeeId)];

    // 2. Find missing employees and their emails
    const missingEmployees = await prisma.employee.findMany({
      where: { id: { notIn: excusedIds } },
      include: { user: { select: { email: true } } }
    });

    if (missingEmployees.length === 0) return res.status(200).json({ message: "Everyone is checked in!" });

    // 3. Send Emails & In-App Notifications
    const emails = [];
    const notifications = [];

    missingEmployees.forEach(emp => {
      if (emp.user.email) emails.push(emp.user.email);
      notifications.push({
        userId: emp.userId,
        title: `Reminder: Check-in`,
        message: `You haven't checked in for work today yet. Please punch in.`,
        type: 'reminder'
      });
    });

    if (notifications.length > 0) await prisma.notification.createMany({ data: notifications });
    if (emails.length > 0) {
      const template = emailTemplates.forgotCheckIn();
      await sendMail({ bcc: emails, ...template });
    }

    res.status(200).json({ success: true, message: `Reminders sent to ${emails.length} employees.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 10. REMINDER: FORGOT CHECK-OUT
exports.remindCheckOut = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const endOfToday = new Date(startOfToday);
    endOfToday.setUTCDate(endOfToday.getUTCDate() + 1);

    // Find everyone who checked in today, but checkOutTime is STILL NULL
    const forgotToClockOut = await prisma.attendance.findMany({
      where: { 
        date: { gte: startOfToday, lt: endOfToday },
        checkInTime: { not: null },
        checkOutTime: null 
      },
      include: { employee: { include: { user: { select: { email: true } } } } }
    });

    if (forgotToClockOut.length === 0) return res.status(200).json({ message: "Everyone checked out!" });

    // Send Emails & In-App Notifications
    const emails = [];
    const notifications = [];

    forgotToClockOut.forEach(record => {
      if (record.employee.user.email) emails.push(record.employee.user.email);
      notifications.push({
        userId: record.employee.userId,
        title: `Reminder: Check-out`,
        message: `You are still clocked in. Please remember to check out.`,
        type: 'reminder'
      });
    });

    if (notifications.length > 0) await prisma.notification.createMany({ data: notifications });
    if (emails.length > 0) {
      const template = emailTemplates.forgotCheckOut();
      await sendMail({ bcc: emails, ...template });
    }

    res.status(200).json({ success: true, message: `Reminders sent to ${emails.length} employees.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};