// ==========================================
// DEMO MAINTENANCE
// Housekeeping for a DEMO_MODE server, run every few minutes and before each
// new demo:
//   1. delete expired demo accounts (demoCleanup.js)
//   2. rebuild the sample company once a day, while nobody is in a demo
//      (demoReset.js)
//   3. otherwise, top up the sample company's attendance for yesterday and
//      today, so people check in and out as the day goes on (demoSeed.js)
// ==========================================
const prisma = require('./prisma');
const { DEMO_MAINTENANCE_INTERVAL_MINUTES } = require('../constants/demo');
const { purgeExpiredDemoUsers } = require('./demoCleanup');
const { resetDemoCompanyIfDue } = require('./demoReset');
const { syncDemoAttendance, utcDay, addDays } = require('./demoSeed');

// Runs one step; a failure is logged and doesn't stop the other steps.
async function runStep(name, step) {
  try {
    return await step();
  } catch (error) {
    console.error(`[demo] ${name} failed:`, error);
    return null;
  }
}

// Never throws, and skips if a previous run is still going, so it's safe to
// call from a timer or a request handler.
let running = false;

async function runDemoMaintenance() {
  if (running) return;

  running = true;
  try {
    const purged = await runStep('Cleanup', () => purgeExpiredDemoUsers());
    if (purged > 0) {
      console.log(`[demo] Deleted ${purged} expired demo account(s).`);
    }

    const seeded = await runStep('Daily reset', () => resetDemoCompanyIfDue());
    if (seeded) {
      console.log(
        `[demo] Sample company rebuilt: ${seeded.employees} employees, ${seeded.attendance} attendance ` +
        `records, ${seeded.leaves} leave requests, ${seeded.payslips} payslips, ${seeded.tasks} tasks.`
      );
      return;
    }

    await runStep('Attendance top-up', () =>
      syncDemoAttendance(prisma, { from: addDays(utcDay(new Date()), -1) })
    );
  } finally {
    running = false;
  }
}

// Runs once now, then every DEMO_MAINTENANCE_INTERVAL_MINUTES. Returns the
// first run's promise so startup can wait for it (on a fresh database, that
// run builds the sample company). Needs a long-running server; on serverless
// hosts the run in POST /api/auth/demo does the work instead.
function startDemoMaintenanceSchedule() {
  const timer = setInterval(runDemoMaintenance, DEMO_MAINTENANCE_INTERVAL_MINUTES * 60 * 1000);
  timer.unref();
  return runDemoMaintenance();
}

module.exports = {
  runDemoMaintenance,
  startDemoMaintenanceSchedule
};
