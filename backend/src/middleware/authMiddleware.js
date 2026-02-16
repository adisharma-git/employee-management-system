const jwt = require('jsonwebtoken');

// 1. Verify Token (Authentication)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// 2. Verify Admin (Authorization)
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    return res.status(403).json({ message: "Access Denied: Admins Only" });
  }
};

// Export BOTH functions
module.exports = { verifyToken, verifyAdmin };