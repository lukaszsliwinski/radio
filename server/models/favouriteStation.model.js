const mongoose = require('mongoose');

const FavouriteStationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  stationId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  favicon: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model.FavouriteStations || mongoose.model('FavouriteStations', FavouriteStationSchema);
