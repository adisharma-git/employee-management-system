const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');

// 1. GET ALL EMPLOYEES (The Directory)
exports.getAllEmployees = async (req, res) => {
  try {
    // Fetch users who are NOT admins (Role = 'employee')
    // We include the 'employee' profile data too
    const employees = await prisma.user.findMany({
      where: { role: 'employee' },
      select: {
        id: true,
        email: true,
        role: true,
        employee: {
          select: {
            id: true,
            name: true,
            designation: true,
            department: true,
            dateOfJoining: true,
            salaryStructure: {
              select: {
                baseSalary: true,
                allowances: true,
                taxRate: true,
                updatedAt: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. CREATE NEW EMPLOYEE (The Onboarding)
exports.createEmployee = async (req, res) => {
  try {
  //  Extract the new salary fields from req.body
    const { 
      name, email, password, department, designation,
      baseSalary, allowances, taxRate 
    } = req.body;

    // A. Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // B. Hash the temporary password
    const hashedPassword = await bcrypt.hash(password, 10);

    // C. Transaction: Create User, Profile, Leaves, AND Salary all at once!
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Login Account
      const newUser = await tx.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          role: 'employee', 
        }
      });

      // 2. Create Profile
      const newProfile = await tx.employee.create({
        data: {
          userId: newUser.id,
          name,
          department,
          designation,
          dateOfJoining: new Date()
        }
      });

      // 3. THE AUTOMATION TRIGGER: Assign Default Leaves
      const activeLeavePolicies = await tx.leaveType.findMany({
        where: { isActive: true }
      });

      if (activeLeavePolicies.length > 0) {
        const defaultBalances = activeLeavePolicies.map(policy => ({
          employeeId: newProfile.id, 
          leaveTypeId: policy.id,
          allocated: policy.defaultDays,
          used: 0
        }));

        await tx.leaveBalance.createMany({
          data: defaultBalances
        });
      }

      // 4. ✅ THE NEW AUTOMATION: Assign Salary Structure
      let newSalaryStructure = null;
      if (baseSalary) {
        newSalaryStructure = await tx.salaryStructure.create({
          data: {
            employeeId: newProfile.id,
            baseSalary: parseFloat(baseSalary),
            allowances: parseFloat(allowances || 0),
            taxRate: parseFloat(taxRate || 0)
          }
        });
      }

      // Return everything so the frontend gets the complete newly created record
      return { 
        user: newUser, 
        employee: newProfile, 
        salaryStructure: newSalaryStructure 
      };
    });

    res.status(201).json({ success: true, message: "Employee Onboarded!", data: result });

  } catch (error) {
    console.error("Onboarding Error:", error);
    res.status(500).json({ message: "Onboarding Failed", error: error.message });
  }
};