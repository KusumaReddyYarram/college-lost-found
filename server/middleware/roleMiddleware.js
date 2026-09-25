/**
 * Role-Based Access Control Middleware
 * Restricts API endpoints to specific user roles ('student', 'staff', 'admin').
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Not authorized, user identity not verified'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

module.exports = { authorize };
