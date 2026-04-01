const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

// ==========================================
// AUTHENTICATE MIDDLEWARE
// Verifies JWT token and attaches user to request
// ==========================================
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided. Please login.' 
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Old tokens without JTI cannot be revoked safely.
    if (!decoded.jti) {
      return res.status(401).json({
        success: false,
        message: 'Token format outdated. Please login again.'
      });
    }

    // Check if token was revoked on logout.
    const revokedToken = await prisma.revokedToken.findUnique({
      where: { jti: decoded.jti },
      select: { id: true }
    });

    if (revokedToken) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked. Please login again.'
      });
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        isSuperAdmin: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: true
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found. Token invalid.' 
      });
    }

    // Attach user to request object
    req.user = user;
    req.token = token;
    req.tokenPayload = decoded;
    next();

  } catch (error) {
    console.error('Authentication Error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired. Please login again.' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Authentication failed',
      error: error.message 
    });
  }
};

// ==========================================
// AUTHORIZE MIDDLEWARE (Role-Based Access Control)
// Checks if user has required role
// ==========================================
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}` 
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };