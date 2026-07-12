const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const prisma = new PrismaClient();

// Register a new user
async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return sendError(res, 'Name, email and password are required', null, 400);
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return sendError(res, 'Email already in use', null, 409);
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });
    const token = generateToken({ id: user.id, role: user.role });
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    return sendSuccess(res, { token, user: userData }, 'User registered', 201);
  } catch (err) {
    return sendError(res, 'Registration failed', err.message, 500);
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, 'Email and password are required', null, 400);
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return sendError(res, 'Invalid credentials', null, 401);
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return sendError(res, 'Invalid credentials', null, 401);
    }
    const token = generateToken({ id: user.id, role: user.role });
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    return sendSuccess(res, { token, user: userData }, 'Login successful');
  } catch (err) {
    return sendError(res, 'Login failed', err.message, 500);
  }
}

// Get profile of authenticated user
async function getProfile(req, res) {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) {
      return sendError(res, 'User not found', null, 404);
    }
    return sendSuccess(res, user, 'User profile');
  } catch (err) {
    return sendError(res, 'Failed to fetch profile', err.message, 500);
  }
}

module.exports = { register, login, getProfile };

