const prisma = require("../config/db");

// GET ALL TRIPS
exports.getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        vehicle: true,
        driver: true,
      },
    });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TRIP BY ID
exports.getTripById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        vehicle: true,
        driver: true,
      },
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE TRIP
exports.createTrip = async (req, res) => {
  try {
    const {
      vehicleId,
      driverId,
      source,
      destination,
      distance,
      startTime,
      endTime,
      status,
    } = req.body;

    const trip = await prisma.trip.create({
      data: {
        vehicleId: Number(vehicleId),
        driverId: Number(driverId),
        source,
        destination,
        distance: Number(distance),
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        status,
      },
    });

    res.status(201).json({
      success: true,
      message: "Trip Created Successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TRIP
exports.updateTrip = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const trip = await prisma.trip.update({
      where: { id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Trip Updated Successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TRIP
exports.deleteTrip = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.trip.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Trip Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
