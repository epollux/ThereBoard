const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Service = require("../models/Service");
const Device = require("../models/Device");

// @desc      Get services
// @route     GET /api/v1/service
// @route     GET /api/v1/devices/:deviceId/services
// @access    Public
exports.getServices = asyncHandler(async (req, res, next) => {
  if (req.params.deviceId) {
    const courses = await Service.find({ device: req.params.deviceId });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single service
// @route     GET /api/v1/services/:id
// @access    Public
exports.getService = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "device",
    select: "name type description",
  });

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc      Add service
// @route     POST /api/v1/devices/:deviceId/services
// @access    Private
exports.addService = asyncHandler(async (req, res, next) => {
  req.body.device = req.params.deviceId;
  req.body.user = req.user.id;

  const device = await Device.findById(req.params.deviceId);

  if (!device) {
    return next(
      new ErrorResponse(`No device with the id of ${req.params.deviceId}`),
      404
    );
  }

  // Make sure user is device owner
  if (device.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a service to device ${device._id}`,
        401
      )
    );
  }

  const service = await Service.create(req.body);

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc      Update service
// @route     PUT /api/v1/services/:id
// @access    Private
exports.updateService = asyncHandler(async (req, res, next) => {
  let servicec = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is service owner
  if (service.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update service ${course._id}`,
        401
      )
    );
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc      Delete service
// @route     DELETE /api/v1/services/:id
// @access    Private
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is course owner
  if (service.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete service ${course._id}`,
        401
      )
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
