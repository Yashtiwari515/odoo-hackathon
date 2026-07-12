<<<<<<< HEAD
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/responseHandler');

// Get all vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await prisma.vehicle.findMany();
    return sendSuccess(res, vehicles, 'Vehicles fetched');
  } catch (err) {
    return sendError(res, 'Failed to fetch vehicles', err.message, 500);
  }
}

// Get vehicle by ID
async function getVehicleById(req, res) {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: Number(id) } });
    if (!vehicle) return sendError(res, 'Vehicle not found', null, 404);
    return sendSuccess(res, vehicle, 'Vehicle fetched');
  } catch (err) {
    return sendError(res, 'Failed to fetch vehicle', err.message, 500);
  }
}

// Create a new vehicle
async function createVehicle(req, res) {
  const { model, vehicleNumber, vehicleType, capacity, status } = req.body;
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        model,
        vehicleNumber: vehicleNumber || undefined,
        vehicleType: vehicleType || undefined,
        capacity: Number(capacity),
        status: status || undefined,
      },
    });
    return sendSuccess(res, vehicle, 'Vehicle created', 201);
  } catch (err) {
    return sendError(res, 'Failed to create vehicle', err.message, 500);
  }
}

// Update vehicle
async function updateVehicle(req, res) {
  const { id } = req.params;
  const { model, vehicleNumber, vehicleType, capacity, status } = req.body;
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: {
        model,
        vehicleNumber: vehicleNumber || undefined,
        vehicleType: vehicleType || undefined,
        capacity: capacity !== undefined ? Number(capacity) : undefined,
        status: status || undefined,
      },
    });
    return sendSuccess(res, vehicle, 'Vehicle updated');
  } catch (err) {
    return sendError(res, 'Failed to update vehicle', err.message, 500);
  }
}

// Delete vehicle
async function deleteVehicle(req, res) {
  const { id } = req.params;
  try {
    await prisma.vehicle.delete({ where: { id: Number(id) } });
    return sendSuccess(res, null, 'Vehicle deleted');
  } catch (err) {
    return sendError(res, 'Failed to delete vehicle', err.message, 500);
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
=======
const prisma = require("../config/db");

// Get All Vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Vehicle By ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Vehicle
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({
      data: req.body,
    });

    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    await prisma.vehicle.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Vehicle Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
>>>>>>> origin/member-4
};
