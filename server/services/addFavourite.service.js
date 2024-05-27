const FavouriteStation = require('../models/favouriteStation.model');

// save favourite station to database
const saveFavourite = (data, username) => {
  const favStation = new FavouriteStation({
    id: `${username}_${data.id}`,
    stationId: data.id,
    name: data.name,
    url: data.url,
    favicon: data.favicon,
    country: data.country,
    user: username
  });

  return favStation.save();
};

module.exports = {
  saveFavourite
};
