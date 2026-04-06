const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); 
const { DEFAULT_EMPLOYEE_PERMISSIONS } = require('../src/utils/defaultRolePermissions');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean the database (Order matters so we don't break relationships!)
  await prisma.dailyLog.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany(); // ✅ NEW: Clear old roles
  
  console.log('🧹 Database cleared.');

  // ==========================================
  // 2. CREATE THE MASTER ROLES
  // ==========================================
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'Super Admin',
      description: 'Master access to all system features',
      // Super Admin role starts with empty permissions - they bypass checks anyway via isSuperAdmin flag
      permissions: [] 
    }
  });

  const employeeRole = await prisma.role.create({
    data: {
      name: 'Employee',
      description: 'Standard employee access',
      // Default employee access mirrors the current employee-facing modules.
      permissions: DEFAULT_EMPLOYEE_PERMISSIONS
    }
  });

  console.log('🛡️ Dynamic Roles created.');

  // ==========================================
  // 3. SEED THE 4 SUPER ADMIN USERS
  // ==========================================
  const admins = [
    { name: 'Aniket Adarsh', email: 'aniket@workalignr.com', password: 'aniket' },
    { name: 'Akriti Kumari', email: 'akriti@workalignr.com' , password: 'akriti'},
    { name: 'Himanshu Pandey', email: 'himanshu@workalignr.com' , password: 'himanshu'},
    { name: 'Aditya Sharma', email: 'aditya@workalignr.com' , password: 'aditya'},
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const user = await prisma.user.create({
      data: {
        email: admin.email,
        passwordHash: hashedPassword, 
        roleId: superAdminRole.id,
        isSuperAdmin: true, // ✅ Mark as Super Admin
        employee: {
          create: {
            name: admin.name,
            designation: 'System Administrator',
            department: 'IT',
            dateOfJoining: new Date(),
          },
        },
      },
    });
    console.log(`✅ Created Super Admin: ${admin.email}`);
  }

  // ==========================================
  // 4. SEED THE 2 TEST EMPLOYEE USERS
  // ==========================================
  const employeePassword = await bcrypt.hash('employee', 10);

  const employees = [
    { name: 'Employee 1', email: 'employee1@workalignr.com' },
    { name: 'Employee 2', email: 'employee2@workalignr.com' },
  ];

  for (const emp of employees) {
    const user = await prisma.user.create({
      data: {
        email: emp.email,
        passwordHash: employeePassword,
        roleId: employeeRole.id,
        isSuperAdmin: false, // ✅ Regular employee
        employee: {
          create: {
            name: emp.name,
            designation: 'Software Engineer',
            department: 'Engineering',
            dateOfJoining: new Date(),
          },
        },
      },
    });
    console.log(`✅ Created Employee: ${emp.email}`);
  }

  console.log('🌱 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });