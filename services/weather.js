const ExternalApi = require("./externalapi");

class Weather extends ExternalApi {
  constructor(lat, lon, parameters) {
    super();
    this.lat = lat;
    this.lon = lon;
    this.parameters = parameters;
  }

  async getData() {
    let url =
      process.env.WEATHER_URL +
      "onecall?lon=" +
      this.lon +
      "&lat=" +
      this.lat +
      "&units=" +
      process.env.WEATHER_UNIT +
      "&appid=" +
      process.env.WEATHER_APIKEY;

    const fetchedData = await this.callApi(url);
    for (var parameter of this.parameters) {
      switch (parameter) {
        case "current_temp":
          this.data["feels_temp"] = fetchedData.current.feels_like;
          this.data["temp"] = fetchedData.current.temp;
          break;

        case "rain_8h":
          this.rain8h(fetchedData.hourly);
          break;

        default:
          console.log(`Parameter ${parameter} does not exist.`);
      }
    }
  }

  rain8h(hourlyData) {
    // loop through inputData and find out if it's going to rain
    this.data["rain_mm"] = [];

    for (var hourly in hourlyData) {
      if (hourlyData[hourly].rain) {
        this.data["rain_mm"][hourly] = hourlyData[hourly].rain["1h"];
      } else {
        this.data["rain_mm"][hourly] = 0;
      }
      if (hourly == 7) {
        break;
      }
    }
  }
}

module.exports = Weather;
