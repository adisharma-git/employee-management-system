const prisma = require('../utils/prisma');

// 1. CREATE MEETING (Admin)
exports.createMeeting = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { title, description, date, meetLink } = req.body;

    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        date: new Date(date), // Expects an ISO string like "2026-03-20T14:30:00.000Z"
        meetLink,
        createdBy: adminId
      }
    });

    res.status(201).json({ success: true, message: "Meeting scheduled.", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET UPCOMING MEETINGS (Everyone)
exports.getUpcomingMeetings = async (req, res) => {
  try {
    const now = new Date();

    const meetings = await prisma.meeting.findMany({
      where: { date: { gte: now } }, // Only meetings that haven't happened yet
      orderBy: { date: 'asc' },
      take: 5 // Get the next 5 upcoming meetings
    });

    res.json({ success: true, count: meetings.length, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};