const axios = require('axios');

const search = (request, response) => {
  // de1, at1, nl1
  const url = `https://at1.api.radio-browser.info/json/stations/byname/${request.body.query}?limit=10`

  let stations = [];

  axios
    .get(url)
    .then((result) => {
      result.data.forEach(element => {
        let newFavicon;
        element.favicon === '' ? newFavicon = '// default favicon //' : newFavicon = element.favicon;

        stations.push({
          id: element.stationuuid,
          name: element.name,
          url: element.url_resolved,
          favicon: newFavicon,
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
