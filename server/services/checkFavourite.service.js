const FavouriteStation = require('../models/favouriteStation.model');

const findFavouriteById = (id) => {
  return FavouriteStation.findOne({ id: id });
};

module.exports = {
  findFavouriteById
};
