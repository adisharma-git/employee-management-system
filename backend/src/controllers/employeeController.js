const prisma = require('../utils/prisma');

exports.getEmployeeDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // This fetches EVERYTHING in the Employee table (Name, Phone, Dept, etc.)
    const employee = await prisma.employee.findUnique({
      where: { userId: userId }
    });
    
    if (!employee) return res.status(404).json({ message: "Employee record not found" });
    
    res.status(200).json({ success: true, data: employee });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Current User Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from middleware

    const employee = await prisma.employee.findUnique({
      where: { userId: userId }, // Find employee linked to this User
      include: { user: { select: { email: true, role: true } } }
    });

    if (!employee) 
      return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({ success: true, data: employee });
    
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Profile Logic
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // field allowed to change
    const { phone, department, designation, dateOfJoining } = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: { userId: userId },
      data: {
        phone,
        department,
        designation,
        dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : undefined
      }
    });

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully", 
      data: updatedEmployee 
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};