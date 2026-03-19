const prisma = require('../utils/prisma');

// 1. GET MY INBOX & UNREAD COUNT
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Fetch the latest 50 notifications for this specific user
    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }, 
      take: 50 
    });

    // Count how many are unread for the red badge
    const unreadCount = await prisma.notification.count({
      where: { 
        userId: userId, 
        isRead: false 
      }
    });

    res.json({
      success: true,
      unreadCount: unreadCount,
      data: notifications
    });

  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. MARK A SINGLE NOTIFICATION AS READ
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; 

    // Verify it exists and belongs to the logged-in user
    const notification = await prisma.notification.findUnique({ where: { id } });
    
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }
    if (notification.userId !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    // Flip the switch
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });

    res.json({ success: true, message: "Marked as read.", data: updatedNotification });

  } catch (error) {
    console.error("Mark Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. MARK ALL AS READ (The "Clear All" Button)
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    // Update every unread notification belonging to this user
    const result = await prisma.notification.updateMany({
      where: { 
        userId: userId,
        isRead: false 
      },
      data: { isRead: true }
    });

    res.json({ 
      success: true, 
      message: `Marked ${result.count} notifications as read.` 
    });

  } catch (error) {
    console.error("Mark All Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};