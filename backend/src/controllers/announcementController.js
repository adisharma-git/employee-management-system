const prisma = require('../utils/prisma');

// 1. CREATE ANNOUNCEMENT (Admin Only)
exports.createAnnouncement = async (req, res) => {
  try {
    const adminId = req.user.id; 
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        createdBy: adminId
      }
    });

    res.status(201).json({
      success: true,
      message: "Announcement posted successfully.",
      data: announcement
    });

  } catch (error) {
    console.error("Create Announcement Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET LATEST ANNOUNCEMENTS (With Pagination)
exports.getAnnouncements = async (req, res) => {
  try {
    // 1. Get pagination values from the URL query (e.g., ?page=1&limit=10)
    // Default to page 1 and limit 10 if the frontend doesn't provide them
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // 2. Calculate how many records to skip
    const skip = (page - 1) * limit;

    // 3. Fetch the data & the total count simultaneously
    const [announcements, totalCount] = await Promise.all([
      prisma.announcement.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' }, // Newest first!
        include: {
          author: { select: { email: true } } // Optional: Shows who posted it
        }
      }),
      prisma.announcement.count() // Gets the total number of announcements in the DB
    ]);

    // 4. Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      pagination: {
        totalRecords: totalCount,
        currentPage: page,
        totalPages: totalPages,
        limit: limit
      },
      data: announcements
    });

  } catch (error) {
    console.error("Get Announcements Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};