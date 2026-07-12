const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password.
 * @param {string} password - Plain password.
 * @param {number} [saltRounds=10] - Number of bcrypt salt rounds.
 * @returns {Promise<string>} Hashed password.
 */
async function hashPassword(password, saltRounds = 10) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain password with a hashed password.
 * @param {string} password - Plain password.
 * @param {string} hashed - Hashed password from DB.
 * @returns {Promise<boolean>} True if match.
 */
async function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = { hashPassword, comparePassword };
