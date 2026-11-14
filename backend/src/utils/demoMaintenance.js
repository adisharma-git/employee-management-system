// ==========================================
// DEMO MAINTENANCE
// Sets up the demo schema when the server starts, then keeps it tidy. Every
// few minutes, and before each new demo:
//   1. delete expired demo accounts (demoCleanup.js)
//   2. rebuild the sample company once a day, while nobody is in a demo
//      (demoReset.js)
//   3. otherwise, top up the sample company's attendance for yesterday and
//      today, so people check in and out as the day goes on (demoSeed.js)
// ==========================================
const { DEMO_MAINTENANCE_INTERVAL_MINUTES } = require('../constants/demo');
const { getDemoClient, migrateDemoSchema } = require('./demoDatabase');
const { ensureDemoRole } = require('./defaultRolePermissions');
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
      syncDemoAttendance(getDemoClient(), { from: addDays(utcDay(new Date()), -1) })
    );
  } finally {
    running = false;
  }
}

// Demo requests are refused (503) until setup finishes.
let ready = false;
const isDemoReady = () => ready;

// Called once at startup, after the server is already taking requests, so the
// main app never waits for it. Creates or updates the demo schema, makes sure
// the Demo role exists, builds the sample company if it's due (always, on a
// new schema), then repeats maintenance every DEMO_MAINTENANCE_INTERVAL_MINUTES.
// Needs a long-running server; on serverless hosts the maintenance run in
// POST /api/auth/demo does the work instead. Never throws: if setup fails,
// the demo stays off and the rest of the app is unaffected.
async function startDemo() {
  try {
    await migrateDemoSchema();
    await ensureDemoRole(getDemoClient());
    await runDemoMaintenance();

    const timer = setInterval(runDemoMaintenance, DEMO_MAINTENANCE_INTERVAL_MINUTES * 60 * 1000);
    timer.unref();

    ready = true;
    console.log('[demo] Demo is ready: /api/auth/demo is enabled.');
  } catch (error) {
    console.error('[demo] Setup failed, so the demo is off:', error);
  }
}

module.exports = {
  runDemoMaintenance,
  startDemo,
  isDemoReady
};
