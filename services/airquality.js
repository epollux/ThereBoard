const fetch = require("node-fetch");
const BusinessLogic = require("./businesslogic");

class AirQuality extends BusinessLogic {
  constructor(lat, lon) {
    super();
    this.lat = lat;
    this.lon = lon;
  }

  async fetch() {
    try {
      const url = `${process.env.AIRQUAL_URL}airquality?lon=${this.lon}&lat=${this.lat}&key=${process.env.AIRQUAL_APIKEY}`;
      const response = await fetch(url);
      this.data = await response.json();
      console.log(this.data);
    } catch (error) {
      console.log(`Fetch error: ${error}`);
    }
  }
}

module.exports = AirQuality;
