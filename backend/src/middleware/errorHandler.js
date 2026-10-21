// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // PostgreSQL errors
  if (err.code === '23505') {
    // Unique constraint violation
    statusCode = 409;
    message = 'This record already exists';
  } else if (err.code === '23503') {
    // Foreign key constraint violation
    statusCode = 400;
    message = 'Invalid reference to related data';
  } else if (err.code === '22P02') {
    // Invalid text representation
    statusCode = 400;
    message = 'Invalid data format';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler for undefined routes
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// Async handler wrapper to catch errors in async route handlers
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
