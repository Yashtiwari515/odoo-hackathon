const prisma = require("../config/db");

// Get All Maintenance Records
exports.getMaintenances = async (req, res) => {
  try {
    const records = await prisma.maintenance.findMany({
      include: {
        vehicle: true,
      },
    });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Maintenance By Id
exports.getMaintenanceById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const record = await prisma.maintenance.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });
    }

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Maintenance
exports.createMaintenance = async (req, res) => {
  try {
    const { vehicleId, type, description, cost, date, status } = req.body;

    // Vehicle exists?
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(vehicleId) },
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const record = await prisma.maintenance.create({
      data: {
        vehicleId: Number(vehicleId),
        type,
        description,
        cost: Number(cost),
        date: new Date(date),
        status,
      },
    });

    res.status(201).json({
      success: true,
      message: "Maintenance Created Successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Maintenance
exports.updateMaintenance = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const record = await prisma.maintenance.update({
      where: { id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Maintenance Updated Successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Maintenance
exports.deleteMaintenance = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.maintenance.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Maintenance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
