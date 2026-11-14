const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const DEFAULT_EXPIRES_IN = '1d';

// Temporary (demo) accounts get a token that ends exactly when the account
// does; everyone else gets the default lifetime.
const getExpiresIn = (user) => {
  if (!user.expiresAt) return DEFAULT_EXPIRES_IN;

  const secondsLeft = Math.floor((new Date(user.expiresAt).getTime() - Date.now()) / 1000);
  return Math.max(secondsLeft, 1);
};

// `demo: true` marks a demo visitor's token, so their requests are served
// from the demo schema (see middleware/demoMiddleware.js).
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, jti: randomUUID(), ...(user.isDemo && { demo: true }) },
    process.env.JWT_SECRET,
    { expiresIn: getExpiresIn(user) }
  );
};

module.exports = { generateToken };
