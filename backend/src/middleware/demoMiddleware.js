const jwt = require('jsonwebtoken');
const { rateLimit } = require('express-rate-limit');
const { runWithDemoDatabase } = require('../utils/demoDatabase');
const { isDemoReady } = require('../utils/demoMaintenance');
const {
  isDemoMode,
  DEMO_RATE_LIMIT_WINDOW_MINUTES,
  DEMO_RATE_LIMIT_MAX_SESSIONS
} = require('../constants/demo');

// Demo routes are off when DEMO_MODE=false, and wait until the demo schema
// is set up after a restart.
const requireDemoMode = (req, res, next) => {
  if (!isDemoMode()) {
    return res.status(403).json({
      success: false,
      message: 'Demo mode is disabled.'
    });
  }

  if (!isDemoReady()) {
    res.set('Retry-After', '60');
    return res.status(503).json({
      success: false,
      code: 'DEMO_STARTING',
      message: 'The demo is starting up. Please try again in a minute.'
    });
  }

  next();
};

// For every request: one carrying a demo visitor's token (valid, with the
// `demo` claim) is handled against the demo schema, so the regular
// controllers serve it demo data. Anything else uses the main database.
// Register after the body parsers.
const demoRequestContext = (req, res, next) => {
  const header = req.headers.authorization;

  if (isDemoMode() && header?.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
      if (payload.demo === true) {
        return runWithDemoDatabase(next);
      }
    } catch {
      // Invalid or expired: `authenticate` rejects it.
    }
  }

  next();
};

// Starting a demo writes to the database without a login, so cap how many
// sessions one IP can start. The store is in memory: it resets on restart and
// isn't shared between instances.
const demoSessionLimiter = rateLimit({
  windowMs: DEMO_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  limit: DEMO_RATE_LIMIT_MAX_SESSIONS,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many demo sessions started from this network. Please try again later.'
  }
});

module.exports = { requireDemoMode, demoRequestContext, demoSessionLimiter };
