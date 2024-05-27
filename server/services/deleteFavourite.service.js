const FavouriteStation = require('../models/favouriteStation.model');

const findByIdAndDelete = (id) => {
  return FavouriteStation.findOneAndDelete({ id: id });
};

module.exports = {
  findByIdAndDelete
};
