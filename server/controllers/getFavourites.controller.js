const FavouriteStation = require('../models/favouriteStation.model');

// get list of favourite stations
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

      response.status(200).json({
        status: 200,
        stations: stations
      });
    })
    .catch(() => {
      response.status(500).json({
        status: 500,
        message: 'error connecting to db'
      })
    });
};

module.exports = getFavourites;
