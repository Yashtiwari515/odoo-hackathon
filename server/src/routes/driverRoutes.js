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

module.exports = router;
