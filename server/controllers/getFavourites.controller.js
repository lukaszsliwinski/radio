const { getFavouritesByUser, formatResponse } = require('../services/getFavourites.service');

// get list of favourite stations
const getFavourites = (request, response) => {
  getFavouritesByUser(response.locals.user.username)
    .then((result) => {
      const stations = formatResponse(result);

      response.status(200).json({
        status: 200,
        stations: stations
      });
    })
    .catch(() => {
      response.status(500).json({
        status: 500,
        message: 'Error connecting to database.'
      });
    });
};

module.exports = getFavourites;
