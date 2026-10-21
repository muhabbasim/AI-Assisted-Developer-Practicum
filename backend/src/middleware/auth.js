// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.'
    });
  }
  next();
};

// Middleware to check if user is NOT authenticated (for login/register pages)
export const requireGuest = (req, res, next) => {
  if (req.session.userId) {
    return res.status(400).json({
      success: false,
      message: 'You are already logged in.'
    });
  }
  next();
};

// Middleware to attach user info to request (optional authentication)
export const optionalAuth = (req, res, next) => {
  // Just pass through - useful for routes that work with or without auth
  next();
};
