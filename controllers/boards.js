const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Device = require("../models/Device");
const refreshDevice = require("../services/refreshdevice");

// @desc      Refresh board data
// @route     GET /api/v1/boards/:id/refresh
// @access    Private
exports.refresh = asyncHandler(async (req, res, next) => {
  console.log(`refresh board: ${req.params.id}`);

  // verify board id and api key
  const device = await Device.findById(req.params.id).populate({
    path: "services",
    select: "name implementation parameters",
  });

  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  // verify apikey
  if (device.apikey !== req.query.apikey) {
    return next(
      new ErrorResponse(
        `Incorrect API Key for device with id of ${req.params.id}`,
        404
      )
    );
  }
  // call refresh service with device data model
  const refreshdata = await refreshDevice(device);

  if (!refreshdata) {
    return next(
      new ErrorResponse(`Error Refresh data for device ${req.params.id}`),
      404
    );
  }
  res.status(200).json({ success: true, data: refreshdata });
});
