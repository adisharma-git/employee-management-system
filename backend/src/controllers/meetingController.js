const prisma = require('../utils/prisma');

// 1. CREATE MEETING (Admin)
exports.createMeeting = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { title, description, date, meetLink } = req.body;

    // 1. Create the meeting
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        date: new Date(date), 
        meetLink,
        createdBy: adminId
      }
    });

    // 2. Fetch all users in the system to notify them
    const allUsers = await prisma.user.findMany({
      select: { id: true }
    });

    // 3. Prepare a notification for every single user
    const notificationsToCreate = allUsers.map(user => ({
      userId: user.id,
      title: `New Meeting Scheduled`,
      message: `${title} has been scheduled for ${meeting.date.toLocaleString()}.`,
      type: 'meeting'
    }));

    // 4. Bulk insert all notifications at once (Super fast!)
    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({
        data: notificationsToCreate
      });
    }

    res.status(201).json({ success: true, message: "Meeting scheduled and notifications sent.", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET UPCOMING MEETINGS (Everyone)
exports.getUpcomingMeetings = async (req, res) => {
  try {
    const now = new Date();

    const meetings = await prisma.meeting.findMany({
      where: { date: { gte: now } }, 
      orderBy: { date: 'asc' },
      take: 5 
    });

    res.json({ success: true, count: meetings.length, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};