// ==========================================
// DEMO MODE
// Enabled per deployment with DEMO_MODE=true. Meant for a separate demo
// environment (own database with fake data), never the production one.
// ==========================================

const DEMO_ROLE_NAME = 'Demo';
const DEMO_SESSION_MINUTES = 15;

// Per-IP limit on starting new demo sessions.
const DEMO_RATE_LIMIT_WINDOW_MINUTES = 60;
const DEMO_RATE_LIMIT_MAX_SESSIONS = 5;

// Most demo accounts (from all IPs) that can be active at once. Counts every
// unexpired demo account, including employees created by demo visitors.
const DEMO_MAX_ACTIVE_USERS = 100;

// How often expired demo accounts are deleted, and how many per batch.
const DEMO_CLEANUP_INTERVAL_MINUTES = 5;
const DEMO_CLEANUP_BATCH_SIZE = 100;

// Profile values given to every new demo user so the leave and payroll
// screens have something to show.
const DEMO_PROFILE_DEFAULTS = {
  department: 'Demo',
  designation: 'Guest',
  baseSalary: 50000,
  allowances: 10000,
  taxRate: 10
};

const isDemoMode = () => process.env.DEMO_MODE === 'true';

module.exports = {
  DEMO_ROLE_NAME,
  DEMO_SESSION_MINUTES,
  DEMO_RATE_LIMIT_WINDOW_MINUTES,
  DEMO_RATE_LIMIT_MAX_SESSIONS,
  DEMO_MAX_ACTIVE_USERS,
  DEMO_CLEANUP_INTERVAL_MINUTES,
  DEMO_CLEANUP_BATCH_SIZE,
  DEMO_PROFILE_DEFAULTS,
  isDemoMode
};
