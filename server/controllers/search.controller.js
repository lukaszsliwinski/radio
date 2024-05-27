const { searchByName, formatResponse } = require('../services/search.service');

const search = (request, response) => {
  // get stations by name
  searchByName(request.body.query)
    .then((result) => {
      const stations = formatResponse(result.data);

      console.log(stations);

      response.status(200).json({
        status: 200,
        stations: stations
      });
    })
    .catch((error) => {
      console.log(error);
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
