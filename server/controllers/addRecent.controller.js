const { saveRecent } = require('../services/addRecent.service');

// add station to recenlty played list
const addRecent = (request, response) => {
  const data = request.body;
  const username = response.locals.user.username;

  // save station to database
  saveRecent(data, username)
    .then(() => {
      response.status(201).json({
        status: 201,
        message: 'Successfully added to recently played list.'
      });
    })
    .catch(() => {
      response.status(500).json({
        status: 500,
        message: 'Server error.'
      });
    });
};

module.exports = addRecent;
