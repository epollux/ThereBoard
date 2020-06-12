const ExternalApi = require("./externalapi");

function pad(n) {
  return n < 10 ? "0" + n : n;
}

class LiveBus extends ExternalApi {
  constructor(
    busStopId,
    lineName,
    lastBus,
    timeToWalk,
    startMonitoring,
    daysActive
  ) {
    super();
    this.busStopId = busStopId;
    this.lineName = lineName;
    this.lastBus = lastBus;
    this.timeToWalk = timeToWalk;
    this.startMonitoring = startMonitoring;
    this.daysActive = daysActive;
  }

  // Only refresh within the time/day window
  inRefreshWindow() {
    const currentDateTime = new Date();
    const dayOfWeek = currentDateTime.getDay();

    // False if day of the week is not in scope
    if (this.daysActive.includes(dayOfWeek) !== true) {
      return false;
    }

    // if current time < start monitoring OR current time > lastbus then exclude --> Return false
    // get current time in hh:mm format
    const currentTime =
      pad(currentDateTime.getHours()).toString() +
      pad(currentDateTime.getMinutes()).toString();

    if (currentTime <= this.startMonitoring || currentTime >= this.lastBus) {
      return false;
    }

    return true;
  }

  // get API data
  async getData() {
    if (this.inRefreshWindow() == true) {
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
      var tz; // offset

      const currentTime = new Date().getTime();
      this.data["refresh"] = true;

      for (var key in fetchedData) {
        // only keep line we want
        if (fetchedData[key].lineName == this.lineName) {
          // get the difference in minutes between expected Arrival Time and Current Time
          var expectedArrivalTime = new Date(fetchedData[key].expectedArrival);

          var expectedArrivalTimeStamp = expectedArrivalTime.getTime();

          // get the expected arrival in the format of lastBus (0830);
          tz = new Date(fetchedData[key].expectedArrival).getTimezoneOffset();
          var hours = Math.floor(tz / 60);
          var minutes = tz % 60;

          var localTimeArrivalHM =
            pad(expectedArrivalTime.getHours() + hours).toString() +
            pad(expectedArrivalTime.getMinutes() + minutes).toString();

          if (localTimeArrivalHM <= this.lastBus) {
            var minutesDiff = Math.round(
              (expectedArrivalTimeStamp - currentTime) / (60 * 1000)
            );

            var leaveIn = minutesDiff - this.timeToWalk;

            // exclude buses leaving too early, add minutes to leave to array
            if (leaveIn > 0) {
              timeToStationArray.push(leaveIn);
            }
          }
        }
      }
      this.data["time_to_station"] = timeToStationArray.sort(function (a, b) {
        return b - a;
      });
    } else {
      this.data["refresh"] = false;
    }
  }
}

module.exports = LiveBus;
