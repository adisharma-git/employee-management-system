// Validation middleware for attendance endpoints

const validateMarkAttendance = (req, res, next) => {
  const { status, checkInTime } = req.body;

  // Validate status
  const validStatuses = ['present', 'absent', 'half-day', 'leave'];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  // Validate checkInTime format (HH:MM:SS)
  if (checkInTime) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    if (!timeRegex.test(checkInTime)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid checkInTime format. Use HH:MM:SS (e.g., 09:30:00)'
      });
    }
  }

  next();
};

const validateUpdateCheckout = (req, res, next) => {
  const { checkOutTime } = req.body;

  if (!checkOutTime) {
    return res.status(400).json({
      success: false,
      message: 'checkOutTime is required'
    });
  }

  // Validate checkOutTime format (HH:MM:SS)
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
  if (!timeRegex.test(checkOutTime)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid checkOutTime format. Use HH:MM:SS (e.g., 18:30:00)'
    });
  }

  next();
};

module.exports = {
  validateMarkAttendance,
  validateUpdateCheckout
};