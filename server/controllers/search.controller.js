const axios = require('axios');

const search = (request, response) => {
  // posible api hosts
  const de1 = axios.get(`https://de1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`);
  const at1 = axios.get(`https://at1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`);
  const nl1 = axios.get(`https://nl1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`);
  const requests = [de1, at1, nl1];

  let stations = [];

  Promise
    .any(requests)
    .then((result) => {
      result.data.forEach(element => {
        let newFavicon;
        element.favicon === '' ? newFavicon = 'api/img/default-radio-icon' : newFavicon = element.favicon;

        stations.push({
          id: element.stationuuid,
          name: element.name,
          url: element.url_resolved,
          favicon: newFavicon,
          country: element.country
        })
      });
      response.json({
        stations: stations
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 503) {
        response.json({
          message: 'The radio-browser external server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.'
        })
      } else {
        response.json({
          message: 'The radio-browser external server error. Please try again later.'
        })
      }
    });
};

module.exports = search;
