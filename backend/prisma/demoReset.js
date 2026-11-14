// Rebuilds the demo's sample company right now: `npm run demo:reset`.
// The demo server already does this by itself once a day; use this to fix the
// data sooner (e.g. after a visitor posts something unpleasant).
//
// Deletes ALL data except roles, including visitors who are mid-demo. It only
// runs with DEMO_MODE=true, and refuses (changing nothing) if the database
// has any account that isn't a demo or sample-company account.
require('dotenv').config();
const { isDemoMode } = require('../src/constants/demo');

if (!isDemoMode()) {
  console.error('Refusing to run: set DEMO_MODE=true. This script is only for the demo database.');
  process.exit(1);
}

const prisma = require('../src/utils/prisma');
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
  .finally(() => prisma.$disconnect());
