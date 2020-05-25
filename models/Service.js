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
    type: [],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
