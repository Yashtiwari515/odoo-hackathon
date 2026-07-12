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
};
