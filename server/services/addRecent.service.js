const RecentStation = require('../models/recentStation.model');
const moment = require('moment');

// save recenlty played station to database
const saveRecent = (data, username) => {
  const recentStation = new RecentStation({
    id: data.id,
    name: data.name,
    url: data.url,
    favicon: data.favicon,
    country: data.country,
    user: username,
    datetime: moment().format('YYYY-MM-DD HH:mm:ss')
  });

  return recentStation.save();
};

module.exports = {
  saveRecent
};
