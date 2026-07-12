// Centralized error handling middleware
const { sendError } = require('../utils/responseHandler');

function errorMiddleware(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;
  return sendError(res, message, details, status);
}

module.exports = errorMiddleware;
