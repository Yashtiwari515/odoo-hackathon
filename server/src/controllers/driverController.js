<<<<<<< HEAD
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/responseHandler');

// Get all drivers
async function getAllDrivers(req, res) {
  try {
    const drivers = await prisma.driver.findMany();
    return sendSuccess(res, drivers, 'Drivers fetched');
  } catch (err) {
    return sendError(res, 'Failed to fetch drivers', err.message, 500);
  }
}

// Get driver by ID
async function getDriverById(req, res) {
  const { id } = req.params;
  try {
    const driver = await prisma.driver.findUnique({ where: { id: Number(id) } });
    if (!driver) return sendError(res, 'Driver not found', null, 404);
    return sendSuccess(res, driver, 'Driver fetched');
  } catch (err) {
    return sendError(res, 'Failed to fetch driver', err.message, 500);
  }
}

// Create a new driver
async function createDriver(req, res) {
  const { name, licenseNumber, phone, email, experience, status } = req.body;
  try {
    const driver = await prisma.driver.create({
      data: {
        name,
        licenseNumber,
        phone,
        email,
        experience: Number(experience),
        status: status || undefined,
      },
    });
    return sendSuccess(res, driver, 'Driver created', 201);
  } catch (err) {
    return sendError(res, 'Failed to create driver', err.message, 500);
  }
}

// Update driver
async function updateDriver(req, res) {
  const { id } = req.params;
  const { name, licenseNumber, phone, email, experience, status } = req.body;
  try {
    const driver = await prisma.driver.update({
      where: { id: Number(id) },
      data: {
        name,
        licenseNumber,
        phone,
        email,
        experience: Number(experience),
        status,
      },
    });
    return sendSuccess(res, driver, 'Driver updated');
  } catch (err) {
    return sendError(res, 'Failed to update driver', err.message, 500);
  }
}

// Delete driver
async function deleteDriver(req, res) {
  const { id } = req.params;
  try {
    await prisma.driver.delete({ where: { id: Number(id) } });
    return sendSuccess(res, null, 'Driver deleted');
  } catch (err) {
    return sendError(res, 'Failed to delete driver', err.message, 500);
  }
}

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
=======
const prisma = require("../config/db");

// Get All Drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Driver By ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Driver
exports.createDriver = async (req, res) => {
  try {
    const driver = await prisma.driver.create({
      data: req.body,
    });

    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await prisma.driver.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Driver
exports.deleteDriver = async (req, res) => {
  try {
    await prisma.driver.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Driver Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
>>>>>>> origin/member-4
};
