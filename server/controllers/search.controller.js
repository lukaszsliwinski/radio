const axios = require('axios');

const search = (request, response) => {
  const url = `https://de1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`

  let stations = [];

  axios
    .get(url)
    .then((result) => {
      result.data.forEach(element => {
        stations.push({
          id: element.stationuuid,
          name: element.name,
          url: element.url,
          favicon: element.favicon,
          country: element.country
        })
      });
      console.log(stations);
      response.json({
        stations: stations
      });
    })
    .catch(error => {
      console.log(error)
    });
};

module.exports = search;
