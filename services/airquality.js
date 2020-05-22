const fetch = require("node-fetch");
const BusinessLogic = require("./businesslogic");

class AirQuality extends BusinessLogic {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  async fetch() {
    try {
      const url = `${process.env.AIRQUALITY_URL}/airquality?lon=${this.lon}&lat=${this.lat}&key=${process.env.AIRQUALITY_APIKEY}`;
      const response = await fetch(url);
      this.data = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AirQuality;
