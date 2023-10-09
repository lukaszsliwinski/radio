const RecentStation = require('../models/recentStation.model');

// get list of recently played stations
const getRecent = (request, response) => {
  RecentStation.find({ user: response.locals.user.username })
    .sort({ datetime: -1 })
    .limit(10)
    .then((result) => {
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

module.exports = getRecent;
