<<<<<<< HEAD
const express = require('express');
const { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver } = require('../controllers/driverController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authenticateUser, authorizeRoles('ADMIN', 'MANAGER', 'DRIVER'), getAllDrivers);
router.get('/:id', authenticateUser, authorizeRoles('ADMIN', 'MANAGER', 'DRIVER'), getDriverById);
router.post('/', authenticateUser, authorizeRoles('ADMIN', 'MANAGER'), createDriver);
router.put('/:id', authenticateUser, authorizeRoles('ADMIN', 'MANAGER'), updateDriver);
router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), deleteDriver);
=======
const express = require("express");

const router = express.Router();

const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
>>>>>>> origin/member-4

module.exports = router;
