const mongoose = require('mongoose');

const FavouriteStationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true,
    unique: false
  },

  url: {
    type: String,
    required: true,
    unique: true
  },

  favicon: {
    type: String,
    required: true,
    unique: false
  },

  country: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model.FavouriteStations || mongoose.model('FavouriteStations', FavouriteStationSchema);
