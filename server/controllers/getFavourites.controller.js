const FavouriteStation = require('../models/favouriteStation.model');

const getFavourites = (request, response) => {
  FavouriteStation.find({ user: response.locals.user.username })
    .then((result) => {
      let stations = [];
      for (let i = 0; i < result.length; i++) {
        stations.push({
          id: result[i].stationId,
          name: result[i].name,
          url: result[i].url,
          favicon: result[i].favicon,
          country: result[i].country
        });
      }

      response.json({
        stations: stations
      });
    })
    .catch(() => {
      response.json({
        status: 500,
        message: 'error connecting to db'
      })
    });
};

module.exports = getFavourites;
