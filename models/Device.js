const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const hat = require("hat");

const DeviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please name this device"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    type: {
      type: String,
      enum: ["arduino", "web", "sensor"],
      default: "arduino",
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    lastSeen: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Geocode & create location field
DeviceSchema.pre("save", async function (next) {
  if (!this.device_id) {
    next();
  }
  this.device_id = hat();
});

// Geocode & create location field
DeviceSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete services when a device is deleted
DeviceSchema.pre("remove", async function (next) {
  console.log(`Services being removed from device ${this._id}`);
  await this.model("Service").deleteMany({ device: this._id });
  next();
});

// Reverse populate with virtuals
DeviceSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "device",
  justOne: false,
});

module.exports = mongoose.model("Device", DeviceSchema);
