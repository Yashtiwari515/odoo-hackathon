const prisma = require("../config/db");

// Get All Fuel Logs
exports.getFuelLogs = async (req, res) => {
  try {
    const fuelLogs = await prisma.fuelLog.findMany({
      include: {
        vehicle: true,
      },
    });

    res.json({
      success: true,
      data: fuelLogs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Fuel Log By Id
exports.getFuelLogById = async (req, res) => {
  try {

    const fuel = await prisma.fuelLog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!fuel) {
      return res.status(404).json({
        success: false,
        message: "Fuel Log not found",
      });
    }

    res.json({
      success: true,
      data: fuel,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Fuel Log
exports.createFuelLog = async (req, res) => {
  try {

    const fuel = await prisma.fuelLog.create({
      data: {
        ...req.body,
        vehicleId: Number(req.body.vehicleId),
        liters: Number(req.body.liters),
        pricePerLiter: Number(req.body.pricePerLiter),
        totalCost: Number(req.body.totalCost),
        odometer: Number(req.body.odometer),
        date: new Date(req.body.date),
      },
    });

    res.status(201).json({
      success: true,
      data: fuel,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Fuel Log
exports.updateFuelLog = async (req, res) => {
  try {

    const fuel = await prisma.fuelLog.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json({
      success: true,
      data: fuel,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Fuel Log
exports.deleteFuelLog = async (req, res) => {
  try {

    await prisma.fuelLog.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Fuel Log Deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};