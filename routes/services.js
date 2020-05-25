const express = require("express");
const {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers/services");

const Service = require("../models/Service");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Service, {
      path: "device",
      select: "name type description",
    }),
    getServices
  )
  .post(protect, authorize("publisher", "admin"), addService);

router
  .route("/:id")
  .get(getService)
  .put(protect, authorize("publisher", "admin"), updateService)
  .delete(protect, authorize("publisher", "admin"), deleteService);

module.exports = router;
