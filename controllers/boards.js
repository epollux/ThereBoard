const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Device = require("../models/Device");
const Weather = require("../services/weather");

// @desc      Refresh board data
// @route     GET /api/v1/boards/:id/refresh
// @access    Private
exports.refresh = asyncHandler(async (req, res, next) => {
  console.log(`refresh board: ${req.params.id}`);

  res.status(200).json({ success: true, data: "Refresh" });
});

/*exports.refresh = asyncHandler(async (req, res, next) => {
  // find device
  console.log(`refresh board: ${req.params.id}`);

  const device = await Device.findById(req.params.id);
  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  // verify api key

  // validate req api key/id vs device id and key

  // get services to fullfil

  // call board processing with device and service models

  // // loop through services
  // // // call service function and build json

  res.status(200).json({ success: true, data: "Cool" });
});
*/

exports.index = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: "Index" });
});
