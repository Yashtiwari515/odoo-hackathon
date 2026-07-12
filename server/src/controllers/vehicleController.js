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
};
