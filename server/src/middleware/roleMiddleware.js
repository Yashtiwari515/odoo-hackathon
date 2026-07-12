/**
 * Role based access control middleware.
 * Usage: authorizeRoles('ADMIN', 'MANAGER')
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthenticated' });
    }
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient permissions',
      });
    }
    next();
  };
}

module.exports = { authorizeRoles };

