const RecentStation = require('../models/recentStation.model');
const moment = require('moment');

// add station to recenlty played list
const addRecent = (request, response) => {
  const recentStation = new RecentStation({
    name: request.body.name,
    url: request.body.url,
    favicon: request.body.favicon,
    country: request.body.country,
    user: response.locals.user.username,
    datetime: moment().format('YYYY-MM-DD HH:mm:ss')
  });

  // save station to database
  recentStation
    .save()
    .then(() => {
      response.status(201).json({
        status: 201,
        message: 'Successfully added to recently played list'
      });
    })
    .catch((error) => {
        console.log(error);
        response.status(500).json({
          status: 500,
          message: 'Server error'
        });
    });
}

module.exports = addRecent;
