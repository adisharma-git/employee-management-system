const prisma = require('../utils/prisma');

// 1. CREATE LEAVE TYPE (Admin Only)
exports.createLeaveType = async (req, res) => {
  try {
    const { name, defaultDays, description } = req.body;

    // Check if it already exists
    const existingType = await prisma.leaveType.findUnique({ where: { name } });
    if (existingType) {
      return res.status(400).json({ success: false, message: "Leave type already exists." });
    }

    const newLeaveType = await prisma.leaveType.create({
      data: {
        name,
        defaultDays,
        description
      }
    });

    res.status(201).json({
      success: true,
      message: "Leave type created successfully.",
      data: newLeaveType
    });
  } catch (error) {
    console.error("Create Leave Type Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET ACTIVE LEAVE TYPES (For Frontend Dropdown)
exports.getActiveLeaveTypes = async (req, res) => {
  try {
    // We only fetch active ones in case the Admin disables an old policy
    const leaveTypes = await prisma.leaveType.findMany({
      where: { isActive: true },
      select: { id: true, name: true, defaultDays: true, description: true }
    });

    res.json({
      success: true,
      data: leaveTypes
    });
  } catch (error) {
    console.error("Get Leave Types Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};