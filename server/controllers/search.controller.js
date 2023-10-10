const axios = require('axios');

const search = (request, response) => {
  // posible api hosts
  const de1 = axios.get(
    `https://de1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=50`
  );
  const at1 = axios.get(
    `https://at1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=50`
  );
  const nl1 = axios.get(
    `https://nl1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=50`
  );
  const requests = [de1, at1, nl1];

  let stations = [];

  // list for urls to prevent repetitions
  let urls = [];

  // get stations from one of three endpoints
  Promise.any(requests)
    .then((result) => {
      result.data.forEach((element) => {
        let newFavicon;
        element.favicon === ''
          ? (newFavicon = 'api/img/default-radio-icon')
          : (newFavicon = element.favicon);

        // don't push more than one station with the same url
        if (!urls.includes(element.url_resolved)) {
          stations.push({
            id: element.stationuuid,
            name: element.name,
            url: element.url_resolved,
            favicon: newFavicon,
            country: element.country
          });
        }

        urls.push(element.url_resolved);
      });
      response.status(200).json({
        status: 200,
        stations: stations
      });
    })
    .catch((error) => {
      if (error.response && error.response.status === 503) {
        response.status(503).json({
          status: 503,
          message:
            'The radio-browser external server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.'
        });
      } else {
        response.status(500).json({
          status: 500,
          message: 'The radio-browser external server error. Please try again later.'
        });
      }
    });
};

module.exports = search;
