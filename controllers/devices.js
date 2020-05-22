const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Device = require("../models/Device");

// @desc      Get all devices
// @route     GET /api/v1/devices
// @access    Public

exports.getDevices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single device
// @route     GET /api/v1/devices/:id
// @access    Public
exports.getDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: device });
});

// @desc      Create new device
// @route     POST /api/v1/devices
// @access    Private
exports.createDevice = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const device = await Device.create(req.body);

  res.status(201).json({
    success: true,
    data: device,
  });
});

// @desc      Update device
// @route     PUT /api/v1/devices/:id
// @access    Private
exports.updateDevice = asyncHandler(async (req, res, next) => {
  let device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is device owner
  if (device.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this device`,
        401
      )
    );
  }

  device = await Device.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: device });
});

// @desc      Delete device
// @route     DELETE /api/v1/devices/:id
// @access    Private
exports.deleteDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`Device not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is device owner
  if (device.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this device`,
        401
      )
    );
  }

  device.remove();

  res.status(200).json({ success: true, data: {} });
});
