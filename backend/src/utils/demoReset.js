// ==========================================
// DEMO RESET
// Empties the demo schema and rebuilds the sample company, once a day.
// Visitors change the shared data (approve leave, run payroll, edit
// projects...), so this puts it back to a clean, current state.
//
// Safety:
// - It only uses the demo schema's client, and its raw SQL names the demo
//   schema explicitly, so it can't touch the main (real) tables.
// - It also refuses to run if the demo schema has any account that is neither
//   a demo visitor nor a sample-company account (seed email domain).
// ==========================================
const { Prisma } = require('@prisma/client');
const { getDemoClient } = require('./demoDatabase');
const { DEMO_SCHEMA, DEMO_SEED_EMAIL_DOMAIN } = require('../constants/demo');
const { seedDemoCompany, seededAccountsWhere, utcDay } = require('./demoSeed');

// Any fixed number; identifies the reset's Postgres advisory lock.
const RESET_LOCK_KEY = 482017;

const qualified = (table) => `"${DEMO_SCHEMA}"."${table}"`;

// Every demo table except roles. Visitors can't change roles, and keeping
// their IDs means a demo that starts while a reset runs still finds the Demo
// role.
const TABLES_TO_EMPTY = Prisma.dmmf.datamodel.models
  .filter((model) => model.name !== 'Role')
  .map((model) => qualified(model.dbName || model.name));

class DemoResetRefusedError extends Error {}

// Due when the sample company wasn't built today (UTC), and only while nobody
// is in a demo, so a reset never cuts a visitor's session short.
async function isResetDue(db, now = new Date()) {
  const firstSeeded = await db.user.findFirst({
    where: seededAccountsWhere,
    orderBy: { createdAt: 'asc' },
    select: { createdAt: true }
  });
  if (firstSeeded && firstSeeded.createdAt >= utcDay(now)) return false;

  const activeVisitors = await db.user.count({
    where: { isDemo: true, expiresAt: { gt: now } }
  });
  return activeVisitors === 0;
}

// Runs the whole reset in one transaction: visitors never see a half-built
// company, and a failure leaves the old data in place. `force` skips the
// "is it due" check (for the manual npm script). Returns the seed counts, or
// null if no reset was due.
async function resetDemoCompany({ force = false, now = new Date() } = {}) {
  return getDemoClient().$transaction(async (tx) => {
    // One reset at a time, across server instances.
    await tx.$queryRawUnsafe(`SELECT 1 FROM pg_advisory_xact_lock(${RESET_LOCK_KEY})`);
    // No new accounts until this transaction ends, so the checks below stay true.
    await tx.$executeRawUnsafe(`LOCK TABLE ${qualified('users')} IN EXCLUSIVE MODE`);

    const otherAccounts = await tx.user.count({
      where: { isDemo: false, NOT: { email: { endsWith: `@${DEMO_SEED_EMAIL_DOMAIN}` } } }
    });
    if (otherAccounts > 0) {
      throw new DemoResetRefusedError(
        `Refusing to reset the demo data: the database has ${otherAccounts} account(s) that ` +
        'are not demo or sample-company accounts. Demo mode needs its own database.'
      );
    }

    // Checked again under the lock: another instance may have just reset.
    if (!force && !(await isResetDue(tx, now))) return null;

    await tx.$executeRawUnsafe(`TRUNCATE TABLE ${TABLES_TO_EMPTY.join(', ')}`);
    return seedDemoCompany(tx, now);
  }, { maxWait: 15000, timeout: 120000 });
}

// For the maintenance timer: resets only when due. After a refusal it stops
// trying until the server restarts, instead of logging it every few minutes.
let refused = false;

async function resetDemoCompanyIfDue(now = new Date()) {
  if (refused || !(await isResetDue(getDemoClient(), now))) return null;

  try {
    return await resetDemoCompany({ now });
  } catch (error) {
    if (error instanceof DemoResetRefusedError) refused = true;
    throw error;
  }
}

module.exports = {
  DemoResetRefusedError,
  isResetDue,
  resetDemoCompany,
  resetDemoCompanyIfDue
};
