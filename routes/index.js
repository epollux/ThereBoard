const express = require("express");
const asyncHandler = require("../middleware/async");

const router = express.Router();

router.route("/").get(
  asyncHandler(async (req, res, next) => {
    console.log("Route index");
    res.status(200).json({
      success: true,
      data: "See that!",
    });
  })
); // consider adding protect to verify the user ID (or API key)

module.exports = router;
