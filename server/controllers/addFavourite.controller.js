const { saveFavourite } = require('../services/addFavourite.service');

// add station to favourites
const addFavourite = (request, response) => {
  const data = request.body;
  const username = response.locals.user.username;

  // save station to database
  saveFavourite(data, username)
    .then(() => {
      response.status(201).json({
        status: 201,
        message: 'Station added to favourites.'
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        response.status(422).json({
          status: 422,
          message: 'This station is already in favourites.'
        });
      } else {
        response.status(500).json({
          status: 500,
          message: 'Error, please try again later.'
        });
      }
    });
};

module.exports = addFavourite;
