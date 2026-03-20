const prisma = require('../utils/prisma');
const { sendMail, emailTemplates } = require('../utils/emailService');

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

    // 2. Fetch all users in the system to notify them (include email)
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true } // ✅ GRAB EMAIL
    });

    // 3. In-App Notifications
    const notificationsToCreate = allUsers.map(user => ({
      userId: user.id,
      title: `New Meeting Scheduled`,
      message: `${title} has been scheduled for ${meeting.date.toLocaleString()}.`,
      type: 'meeting'
    }));

    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({ data: notificationsToCreate });
    }

    // 4. ✅ SEND EMAIL NOTIFICATION (BCC)
    const userEmails = allUsers.map(u => u.email).filter(e => e); // filter removes nulls
    const template = emailTemplates.newMeeting(title, meeting.date, meetLink);
    await sendMail({ bcc: userEmails, ...template }); 

    res.status(201).json({ success: true, message: "Meeting scheduled and notifications sent.", data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

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