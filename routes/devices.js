const express = require("express");
const {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/devices");

const Device = require("../models/Device");

// Include other resource routers
const serviceRouter = require("./services");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:deviceId/services", serviceRouter);

router
  .route("/")
  .get(advancedResults(Device, "devices"), getDevices)
  .post(protect, authorize("publisher", "admin"), createDevice);

router
  .route("/:id")
  .get(getDevice)
  .put(protect, authorize("publisher", "admin"), updateDevice)
  .delete(protect, authorize("publisher", "admin"), deleteDevice);

module.exports = router;
