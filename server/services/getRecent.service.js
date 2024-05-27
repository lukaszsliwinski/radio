const RecentStation = require('../models/recentStation.model');

const getRecentByUser = (username) => {
  return RecentStation.find({ user: username });
};

const formatResponse = (result) => {
  let stations = [];

  for (let i = 0; i < result.length; i++) {
    stations.push({
      id: result[i].id,
      name: result[i].name,
      url: result[i].url,
      favicon: result[i].favicon,
      country: result[i].country,
      datetime: result[i].datetime
    });
  }

  return stations;
};

module.exports = {
  getRecentByUser,
  formatResponse
};
