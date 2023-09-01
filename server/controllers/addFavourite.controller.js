const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const addFavourite = (request, response) => {

  const favStation = new FavouriteStation({
    id: request.body.id,
    name: request.body.name,
    url: request.body.url,
    favicon: request.body.favicon,
    country: request.body.country
  });

  // save station to database
  favStation
    .save()
    .then((result) => {
      response.status(201).send({
        message: 'Station successfully added to favourites!',
        result
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        response.status(422).send({
          message: 'This station is already in favourites',
          error
        });
      } else {
        response.status(500).send({
          message: 'Error, please try again later',
          error
        });
      }
    });
}

module.exports = addFavourite;
