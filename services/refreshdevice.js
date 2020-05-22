const Device = require("../models/Device");
const Weather = require("./weather");
const AirQuality = require("./airquality");

exports.refreshDevice = async (device) => {
  // loop through services and query right data
  const services = device.services;

  for (var service of device.services) {
    console.log(service.name + " " + service.implementation);

    switch (service.implementation) {
      case "weather":
        const weather = new Weather(
          device.location.coordinates[1],
          device.location.coordinates[0],
          device.parameters
        );
        break;

      case "airquality":
        //const weather = new Weather(device.location.coordinates[1], device.location.coordinates[0]);
        //Weather.fetch();
        break;
      default:
        console.log(`Implementation ${member.implementation} does not exist.`);
    }
  }
};

// Air Quality

// Weather
