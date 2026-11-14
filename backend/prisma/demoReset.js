// Rebuilds the demo's sample company right now: `npm run demo:reset`.
// The server already does this by itself once a day; use this to fix the
// demo data sooner (e.g. after a visitor posts something unpleasant).
//
// Only touches the demo schema (DATABASE_URL with ?schema=demo): it deletes
// all demo data except roles, including visitors who are mid-demo. Real data
// is never touched. Refuses to run when DEMO_MODE=false.
require('dotenv').config();
const { isDemoMode } = require('../src/constants/demo');

if (!isDemoMode()) {
  console.error('Refusing to run: demo mode is off (DEMO_MODE=false).');
  process.exit(1);
}

const { getDemoClient } = require('../src/utils/demoDatabase');
const { resetDemoCompany } = require('../src/utils/demoReset');

resetDemoCompany({ force: true })
  .then((seeded) => {
    console.log(
      `Sample company rebuilt: ${seeded.employees} employees, ${seeded.attendance} attendance records, ` +
      `${seeded.leaves} leave requests, ${seeded.payslips} payslips, ${seeded.tasks} tasks.`
    );
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => getDemoClient().$disconnect());
