// ==========================================
// DEMO DATABASE
// Demo data lives in its own schema (DEMO_SCHEMA) of the same database, so
// the demo runs inside the main deployment without touching real data.
//
// - getDemoClient(): a Prisma client for the demo schema. Demo-only code
//   (demo controller, cleanup, reset, seed) uses it directly.
// - runWithDemoDatabase(fn): while fn runs (including everything it awaits),
//   the shared client in utils/prisma.js points at the demo schema too. Used
//   for requests carrying a demo visitor's token, so the regular controllers
//   serve them demo data.
// ==========================================
const path = require('path');
const { execFile } = require('child_process');
const { AsyncLocalStorage } = require('async_hooks');
const { PrismaClient } = require('@prisma/client');
const { DEMO_SCHEMA } = require('../constants/demo');

const demoStorage = new AsyncLocalStorage();
let demoClient = null;

// The same connection string, pointed at the demo schema.
function withDemoSchema(url) {
  const parsed = new URL(url);
  parsed.searchParams.set('schema', DEMO_SCHEMA);
  return parsed.toString();
}

function getDemoClient() {
  if (!demoClient) {
    demoClient = new PrismaClient({
      datasources: { db: { url: withDemoSchema(process.env.DATABASE_URL) } }
    });
  }
  return demoClient;
}

function runWithDemoDatabase(fn) {
  return demoStorage.run(true, fn);
}

const isDemoDatabaseActive = () => demoStorage.getStore() === true;

// Creates the demo schema, or brings it up to date, by running
// `prisma migrate deploy` against it. Safe to run on every start.
function migrateDemoSchema() {
  const prismaCli = require.resolve('prisma/build/index.js');
  const schemaFile = path.join(__dirname, '../../prisma/schema.prisma');
  const env = {
    ...process.env,
    DATABASE_URL: withDemoSchema(process.env.DATABASE_URL),
    DIRECT_URL: withDemoSchema(process.env.DIRECT_URL || process.env.DATABASE_URL)
  };

  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      [prismaCli, 'migrate', 'deploy', '--schema', schemaFile],
      { env, timeout: 5 * 60 * 1000 },
      (error, stdout, stderr) => (error ? reject(new Error(`${error.message}\n${stdout}\n${stderr}`)) : resolve(stdout))
    );
  });
}

module.exports = {
  withDemoSchema,
  getDemoClient,
  runWithDemoDatabase,
  isDemoDatabaseActive,
  migrateDemoSchema
};
