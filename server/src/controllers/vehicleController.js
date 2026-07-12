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
};
