// Standardized API response handlers

/**
 * Send a success response.
 * @param {object} res - Express response object.
 * @param {any} data - Payload to send.
 * @param {string} message - Optional success message.
 * @param {number} [status=200] - HTTP status code.
 */
function sendSuccess(res, data = null, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

/**
 * Send an error response.
 * @param {object} res - Express response object.
 * @param {string} message - Error message.
 * @param {any} error - Optional error details (e.g., validation errors).
 * @param {number} [status=500] - HTTP status code.
 */
function sendError(res, message = 'Error', error = null, status = 500) {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
}

module.exports = { sendSuccess, sendError };
