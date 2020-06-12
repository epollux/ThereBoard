const Device = require("../models/Device");
const Weather = require("./weather");
const AirQuality = require("./airquality");
const LiveBus = require("./livebus");

// Refresh device function
const refreshDevice = async (device) => {
  // loop through services and query right data
  const services = device.services;
  const refreshData = new Object();

  // returned data
  for (var service of device.services) {
    switch (service.implementation) {
      case "weather":
        const weather = new Weather(
          device.location.coordinates[1],
          device.location.coordinates[0],
          service.parameters
        );

        await weather.getData();
        refreshData["weather"] = weather.data;

        break;

      case "airQuality":
        const airQuality = new AirQuality(
          device.location.coordinates[1],
          device.location.coordinates[0],
          service.parameters
        );

        await airQuality.getData();
        refreshData["airQuality"] = airQuality.data;

        break;

      case "liveBus":
        const liveBus = new LiveBus(
          service.parameters[0].stopStation,
          service.parameters[0].lineName,
          service.parameters[0].lbt,
          service.parameters[0].ttw,
          service.parameters[0].sm,
          service.parameters[0].days
        ); // Station stop in paramaters

        await liveBus.getData();
        refreshData["liveBus"] = liveBus.data;

        break;

      default:
        console.log(`Implementation ${service.implementation} does not exist.`);
    }
  }
  return refreshData;
};

module.exports = refreshDevice;
