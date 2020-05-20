const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Device = require("../models/Device");

// @desc      Get board update
// @route     POST /api/v1/boards/getUpdate
// @access    Private
exports.getUpdate = asyncHandler(async (req, res, next) => {
  const board = await Device.findById(req.board.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
