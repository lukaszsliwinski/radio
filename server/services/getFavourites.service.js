const FavouriteStation = require('../models/favouriteStation.model');

const getFavouritesByUser = (username) => {
  return FavouriteStation.find({ user: username });
};

const formatResponse = (result) => {
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

  return stations;
};

module.exports = {
  getFavouritesByUser,
  formatResponse
};
