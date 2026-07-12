const prisma = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    const totalVehicles = await prisma.vehicle.count();

    const totalDrivers = await prisma.driver.count();

    const activeTrips = await prisma.trip.count({
      where: {
        status: "ACTIVE",
      },
    });

    const maintenanceDue = await prisma.maintenance.count({
      where: {
        status: "PENDING",
      },
    });

    const fuelExpense = await prisma.fuelLog.aggregate({
      _sum: {
        totalCost: true,
      },
    });

    const otherExpense = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
    });

    res.json({
      totalVehicles,
      totalDrivers,
      activeTrips,
      maintenanceDue,
      monthlyFuelExpense: fuelExpense._sum.totalCost || 0,
      monthlyOtherExpense: otherExpense._sum.amount || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
