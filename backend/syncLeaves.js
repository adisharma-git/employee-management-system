const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function syncExistingEmployees() {
  try {
    console.log("⏳ Starting leave balance synchronization...");

    // 1. Fetch all active Leave Types (The Master Menu)
    const activeLeaveTypes = await prisma.leaveType.findMany({
      where: { isActive: true }
    });

    if (activeLeaveTypes.length === 0) {
      console.log("❌ No active leave types found. Please create them via the API first.");
      return;
    }

    // 2. Fetch all existing Employees (including your 2 employees and 4 admins if they have employee profiles)
    const allEmployees = await prisma.employee.findMany();

    if (allEmployees.length === 0) {
      console.log("❌ No employees found in the database.");
      return;
    }

    console.log(`Found ${activeLeaveTypes.length} leave policies and ${allEmployees.length} employees.`);

    // 3. Prepare the data payload
    const balancesToCreate = [];

    for (const employee of allEmployees) {
      for (const leaveType of activeLeaveTypes) {
        balancesToCreate.push({
          employeeId: employee.id,
          leaveTypeId: leaveType.id,
          allocated: leaveType.defaultDays,
          used: 0
        });
      }
    }

    // 4. Bulk Insert with a Safety Net
    const result = await prisma.leaveBalance.createMany({
      data: balancesToCreate,
      skipDuplicates: true 
    });

    console.log(`✅ Synchronization complete! Added ${result.count} missing leave balances.`);

  } catch (error) {
    console.error("🚨 Error during synchronization:", error);
  } finally {
    // Always close the database connection when a standalone script finishes
    await prisma.$disconnect(); 
  }
}

// Run the function
syncExistingEmployees();