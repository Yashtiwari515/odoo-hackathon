const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/responseHandler');
require('dotenv').config();

/**
 * Authentication middleware validates JWT and attaches user info to req.user.
 */
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authorization token missing', null, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return sendError(res, 'Invalid or expired token', err.message, 401);
  }
}

module.exports = { authenticateUser };

