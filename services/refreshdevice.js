const Device = require("../models/Device");
const Weather = require("./weather");
const AirQuality = require("./airquality");

const refreshDevice = async (device) => {
  // loop through services and query right data
  const services = device.services;
  const refreshData = new Object();

  // returned data
  for (var service of device.services) {
    switch (service.implementation) {
      case "Weather":
        const weather = new Weather(
          device.location.coordinates[1],
          device.location.coordinates[0],
          service.parameters
        );

        await weather.getData();
        refreshData["Weather"] = weather.data;

        break;

      case "AirQuality":
        const airQuality = new AirQuality(
          device.location.coordinates[1],
          device.location.coordinates[0],
          service.parameters
        );

        await airQuality.getData();
        refreshData["AirQuality"] = airQuality.data;

        break;
      default:
        console.log(`Implementation ${service.implementation} does not exist.`);
    }
  }
  return refreshData;
};

module.exports = refreshDevice;
