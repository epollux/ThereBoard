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

        case "freeze_12h":
          this.freeze12h(fetchedData.hourly);
          break;

        default:
          console.log(`Parameter ${parameter} does not exist.`);
      }
    }
  }

  rain8h(hourlyData) {
    // loop through inputData and find out if it's going to rain
    // use current weather for first measure and ignore first hourly data
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

  freeze12h(hourlyData) {
    // loop through inputData and find out if tenperature is going to be below zero within the next 12h
    this.data["freeze_12h"] = false;

    for (var hourly in hourlyData) {
      if (hourlyData[hourly].temp <= 0) {
        this.data["freeze_12h"] = true;
      }
      if (hourly == 12) {
        break;
      }
    }
  }
}

module.exports = Weather;
