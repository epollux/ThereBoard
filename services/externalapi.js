const fetch = require("node-fetch");

class ExternalApi {
  constructor() {
    this.data = Object();
  }

  async callApi(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`Fetch error: ${error}`);
    }
  }
}

module.exports = ExternalApi;
