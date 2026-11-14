const { rateLimit } = require('express-rate-limit');
const {
  isDemoMode,
  DEMO_RATE_LIMIT_WINDOW_MINUTES,
  DEMO_RATE_LIMIT_MAX_SESSIONS
} = require('../constants/demo');

// Demo routes only exist on a deployment started with DEMO_MODE=true.
const requireDemoMode = (req, res, next) => {
  if (!isDemoMode()) {
    return res.status(403).json({
      success: false,
      message: 'Demo mode is disabled.'
    });
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

module.exports = { requireDemoMode, demoSessionLimiter };
