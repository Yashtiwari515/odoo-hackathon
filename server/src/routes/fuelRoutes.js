const express = require("express");

const router = express.Router();

const {
    getFuelLogs,
    getFuelLogById,
    createFuelLog,
    updateFuelLog,
    deleteFuelLog,
} = require("../controllers/fuelController");

router.get("/", getFuelLogs);
router.get("/:id", getFuelLogById);
router.post("/", createFuelLog);
router.put("/:id", updateFuelLog);
router.delete("/:id", deleteFuelLog);

module.exports = router;