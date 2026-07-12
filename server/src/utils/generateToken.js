const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate a JWT token.
 * @param {Object} payload - Data to embed (e.g., { id, role }).
 * @param {string|number} [expiresIn='1h'] - Expiration time.
 * @returns {string} Signed token.
 */
function generateToken(payload, expiresIn = '1h') {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn });
}

module.exports = generateToken;
