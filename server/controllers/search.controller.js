const axios = require('axios');

const search = (request, response) => {
  const url = 'https://de1.api.radio-browser.info/json/stations/byname/rock?limit=10'
  axios
    .get(url)
    .then((result) => {
      console.log(result);

      response.json({
        response: 'test'
      });


    })
    .catch(error => {
      console.log(error)
    });
};

module.exports = search;
