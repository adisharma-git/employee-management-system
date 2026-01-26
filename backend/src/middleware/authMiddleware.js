const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Get the token from the header (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify the signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach the user info to the request so the Controller can use it
    req.user = decoded; 
    
    next(); // Pass control to the next function (the controller)
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = verifyToken;