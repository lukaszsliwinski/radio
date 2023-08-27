const axios = require('axios');

const search = (request, response) => {
  const url = `https://at1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`

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
      if (error.response.status === 503) {
        response.json({
          status: 503,
          message: `The server 'api.radio-browser.info' is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.`
        })
        console.log(error.response);
      } else {
        console.log(error);
      }

    });
};

module.exports = search;
