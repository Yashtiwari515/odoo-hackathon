<<<<<<< HEAD
const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile);
=======
const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);
>>>>>>> origin/member-4

module.exports = router;
