const { getRecentByUser, formatResponse } = require('../services/getRecent.service');

// get list of recently played stations
const getRecent = (request, response) => {
  getRecentByUser(response.locals.user.username)
    .sort({ datetime: -1 })
    .limit(10)
    .then((result) => {
      const stations = formatResponse(result);

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
