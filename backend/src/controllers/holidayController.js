const prisma = require('../utils/prisma');

// 1. CREATE HOLIDAY (Admin)
exports.createHoliday = async (req, res) => {
  try {
    const { name, date } = req.body;
    
    // Ensure date is stored cleanly
    const holidayDate = new Date(date);

    const holiday = await prisma.holiday.create({
      data: { name, date: holidayDate }
    });

    res.status(201).json({ success: true, message: "Holiday added.", data: holiday });
  } catch (error) {
    if (error.code === 'P2002') return res.status(400).json({ success: false, message: "A holiday already exists on this date." });
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET UPCOMING HOLIDAYS (Everyone)
exports.getUpcomingHolidays = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const holidays = await prisma.holiday.findMany({
      where: { date: { gte: today } }, 
      orderBy: { date: 'asc' }                    
    });

    res.json({ success: true, count: holidays.length, data: holidays });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};