const express = require("express");

const router = express.Router();

const {
  getMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

router.get("/", getMaintenances);

router.get("/:id", getMaintenanceById);

router.post("/", createMaintenance);

router.put("/:id", updateMaintenance);

router.delete("/:id", deleteMaintenance);

module.exports = router;
