
const prisma = require('../utils/prisma'); 
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json(
        { success: false, message: "User already exists" }
    );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the default Employee role
      const employeeRole = await prisma.role.findUnique({
        where: { name: 'Employee' }
      });

      if (!employeeRole) {
        throw new Error('Employee role not found in database');
      }
      
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          roleId: employeeRole.id,
          isSuperAdmin: false,
          employee: {
            create: {
              name: name,
              designation: "Not Assigned", 
              department: "Not Assigned"
            }
          }
        },
        include: { 
          employee: true,
          role: true
        }
      });

      return user;
    });

    // Generate Token
    const token = generateToken(result);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: result.id,
        email: result.email,
        isSuperAdmin: result.isSuperAdmin,
        role: result.role,
        name: result.employee.name
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        employee: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: true
          }
        }
      } 
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
        role: user.role,
        name: user.employee ? user.employee.name : "Admin"
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};