const Device = require("../models/Device");
const Weather = require("./weather");
const AirQuality = require("./airquality");

const refreshDevice = async (device) => {
  // loop through services and query right data
  const services = device.services;

  // returned data
  var refreshdata = [];
  let i = 0;

  for (var service of device.services) {
    console.log(service.implementation);

    switch (service.implementation) {
      case "Weather":
        const weather = new Weather(
          device.location.coordinates[1],
          device.location.coordinates[0],
          device.parameters
        );

        await weather.fetch();
        refreshdata[i] = weather.data;

        break;

      case "AirQuality":
        const airquality = new AirQuality(
          device.location.coordinates[1],
          device.location.coordinates[0],
          device.parameters
        );

        await airquality.fetch();
        refreshdata[i] = airquality.data.data;

        break;
      default:
        console.log(`Implementation ${service.implementation} does not exist.`);
    }
    i++;
  }
  return refreshdata;
};

// Air Quality

// Weather

module.exports = refreshDevice;
