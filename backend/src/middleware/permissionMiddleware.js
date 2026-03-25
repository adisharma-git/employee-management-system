// ==========================================
// PERMISSION MIDDLEWARE
// Checks if user has required permission (for dynamic RBAC)
// ==========================================
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Super Admin bypasses all permission checks
    if (req.user.isSuperAdmin) {
      return next();
    }

    // Check if user has the role with required permission
    if (!req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'User has no role assigned'
      });
    }

    // Check if permission exists in role's permissions array
    if (req.user.role.permissions && req.user.role.permissions.includes(requiredPermission)) {
      return next();
    }

    // Permission denied
    return res.status(403).json({
      success: false,
      message: `Access denied. Required permission: ${requiredPermission}`
    });
  };
};

module.exports = { checkPermission };
