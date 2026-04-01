const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, jti: randomUUID() },
    process.env.JWT_SECRET, 
    { expiresIn: '1d' } // Token expires in 1 day
  );
};

module.exports = { generateToken };