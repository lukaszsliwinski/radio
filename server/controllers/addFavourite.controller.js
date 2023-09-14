const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const addFavourite = (request, response) => {
  const favStation = new FavouriteStation({
    id: `${response.locals.user.username}_${request.body.id}`,
    stationId: request.body.id,
    name: request.body.name,
    url: request.body.url,
    favicon: request.body.favicon,
    country: request.body.country,
    user: response.locals.user.username
  });

  // save station to database
  favStation
    .save()
    .then(() => {
      response.status(201).json({
        status: 201,
        message: 'Station successfully added to favourites!'
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        response.status(422).json({
          status: 422,
          message: 'This station is already in favourites'
        });
      } else {
        response.status(500).json({
          status: 500,
          message: 'Error, please try again later'
        });
      }
    });
}

module.exports = addFavourite;
