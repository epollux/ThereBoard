const ExternalApi = require("./externalapi");

class LiveBus extends ExternalApi {
  constructor(busStopId, leadTime) {
    super();
    this.busStopId = busStopId;
    this.leadTime = leadTime;
  }

  async getData() {
    var url =
      process.env.TFL_URL +
      "StopPoint/" +
      this.busStopId +
      "/Arrivals?app_id=" +
      process.env.TFL_APP_ID +
      "&app_key=" +
      process.env.TFL_APP_KEY;

    const fetchedData = await this.callApi(url);

    var timeToStationArray = [];
    var arrayCount = 0;

    for (var key in fetchedData) {
      if (fetchedData[key].timeToStation >= this.leadTime) {
        timeToStationArray[arrayCount] =
          fetchedData[key].timeToStation - this.leadTime;
        arrayCount++;
      }
    }

    this.data["time_to_station"] = timeToStationArray.sort();
  }
}

module.exports = LiveBus;
