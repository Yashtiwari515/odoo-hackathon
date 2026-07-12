const prisma = require("../config/db");

exports.getReports = async (req, res) => {
  try {
    const tripCount = await prisma.trip.count();

    const distance = await prisma.trip.aggregate({
      _sum: {
        distance: true,
      },
    });

    const fuelExpense = await prisma.fuelLog.aggregate({
      _sum: {
        totalCost: true,
      },
    });

    const maintenanceExpense = await prisma.maintenance.aggregate({
      _sum: {
        cost: true,
      },
    });

    res.json({
      success: true,
      data: {
        tripCount,
        totalDistance: distance._sum.distance || 0,
        fuelExpense: fuelExpense._sum.totalCost || 0,
        maintenanceExpense: maintenanceExpense._sum.cost || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
