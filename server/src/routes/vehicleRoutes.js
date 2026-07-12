<<<<<<< HEAD
const express = require('express');
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public routes (none for vehicles) – all protected
router.get('/', authenticateUser, authorizeRoles('ADMIN', 'MANAGER', 'DRIVER'), getAllVehicles);
router.get('/:id', authenticateUser, authorizeRoles('ADMIN', 'MANAGER', 'DRIVER'), getVehicleById);
router.post('/', authenticateUser, authorizeRoles('ADMIN', 'MANAGER'), createVehicle);
router.put('/:id', authenticateUser, authorizeRoles('ADMIN', 'MANAGER'), updateVehicle);
router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), deleteVehicle);
=======
const express = require("express");

const router = express.Router();

const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

router.get("/", getVehicles);

router.get("/:id", getVehicleById);

router.post("/", createVehicle);

router.put("/:id", updateVehicle);

router.delete("/:id", deleteVehicle);
>>>>>>> origin/member-4

module.exports = router;
