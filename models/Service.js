const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
  },
  implementation: {
    type: String,
    required: [true, "Please add an implementation name"],
  },
  parameters: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  device: {
    type: mongoose.Schema.ObjectId,
    ref: "Device",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
