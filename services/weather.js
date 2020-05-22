const fetch = require("node-fetch");
const BusinessLogic = require("./businesslogic");

class Weather extends BusinessLogic {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  async fetch() {
    try {
      const url = `${process.env.WEATHER_URL}onecall?lon=${this.lon}&lat=${this.lat}&units=${process.env.WEATHER_UNIT}&appid=${process.env.WEATHER_APIKEY}`;
      const response = await fetch(url);
      this.data = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Weather;
