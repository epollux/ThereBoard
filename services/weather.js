const fetch = require("node-fetch");
const BusinessLogic = require("./businesslogic");

class Weather extends BusinessLogic {
  constructor(lat, lon, parameters) {
    super();
    this.lat = lat;
    this.lon = lon;
    this.parameters = parameters;
  }

  async fetch() {
    try {
      const url = `${process.env.WEATHER_URL}onecall?lon=${this.lon}&lat=${this.lat}&units=${process.env.WEATHER_UNIT}&appid=${process.env.WEATHER_APIKEY}`;
      const response = await fetch(url);
      this.data = await response.json();
    } catch (error) {
      console.log(`Fetch error: ${error}`);
    }
  }
}

module.exports = Weather;
