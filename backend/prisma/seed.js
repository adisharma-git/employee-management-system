const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); 

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean the database
  await prisma.dailyLog.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('🧹 Database cleared.');

  // --- THE 4 ADMINS ---
  const admins = [
    { name: 'Aniket Adarsh', email: 'aniket@workalignr.com', password: 'aniket' },
    { name: 'Akriti Kumari', email: 'akriti@workalignr.com' , password: 'akriti'},
    { name: 'Himanshu Pandey', email: 'himanshu@workalignr.com' , password: 'himanshu'},
    { name: 'Aditya Sharma', email: 'aditya@workalignr.com' , password: 'aditya'},
  ];

  for (const admin of admins) {
    // FIX: Hash the password before saving!
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const user = await prisma.user.create({
      data: {
        email: admin.email,
        passwordHash: hashedPassword, // <--- Now this is safe
        role: 'admin',
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
    console.log(`✅ Created Admin: ${admin.email}`);
  }

  // --- THE 2 EMPLOYEES ---
  const employeePassword = await bcrypt.hash('employee', 10);

  const employees = [
    // Fixed typo in email domain (workalignr vs worklignr)
    { name: 'Employee 1', email: 'employee1@workalignr.com', role: 'employee' },
    { name: 'Employee 2', email: 'employee2@workalignr.com', role: 'employee' },
  ];

  for (const emp of employees) {
    const user = await prisma.user.create({
      data: {
        email: emp.email,
        passwordHash: employeePassword,
        role: 'employee',
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