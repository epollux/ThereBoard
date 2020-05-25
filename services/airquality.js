const ExternalApi = require("./externalapi");

class AirQuality extends ExternalApi {
  constructor(lat, lon, parameters) {
    super();
    this.lat = lat;
    this.lon = lon;
    this.parameters = parameters;
  }

  async getData() {
    var url =
      process.env.AIRQUAL_URL +
      "airquality?lon=" +
      this.lon +
      "&lat=" +
      this.lat +
      "&key=" +
      process.env.AIRQUAL_APIKEY;

    const fetchedData = await this.callApi(url);

    for (var parameter of this.parameters) {
      console.log(`AirQuality Parameter: ${parameter}`);

      switch (parameter) {
        case "pollen_tree":
          this.data["pollen_tree"] = fetchedData.data[0].pollen_level_tree;
          break;

        case "pollen_weed":
          this.data["pollen_weed"] = fetchedData.data[0].pollen_level_weed;
          break;

        case "pollen_grass":
          this.data["pollen_grass"] = fetchedData.data[0].pollen_level_grass;
          break;

        case "airquality":
          this.data["airquality"] = fetchedData.data[0].aqi;
          break;

        default:
          console.log(`Parameter ${parameter} does not exist.`);
      }
    }
  }
}

module.exports = AirQuality;
