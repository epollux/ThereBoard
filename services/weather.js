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
      console.log(`AirQuality Parameter: ${parameter}`);

      switch (parameter) {
        case "current_temp":
          this.data["current_temp"] = fetchedData.current.feel_like_temp;
          break;

        case "rain_8h":
          this.data["rain_8h"] = this.rain8h(fetchedData.hourly);
          break;

        default:
          console.log(`Parameter ${parameter} does not exist.`);
      }
    }
  }

  rain8h(hourlyData) {
    // loop through inputData and find out if it's going to rain

    return "yes";
  }
}

module.exports = Weather;
