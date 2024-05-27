const { findFavouriteById } = require('../services/checkFavourite.service');

// check if station is in favourites
const checkFavourite = (request, response) => {
  findFavouriteById(`${response.locals.user.username}_${request.body.id}`)
    .then((result) => {
      response.status(200).json({
        fav: result !== null
      });
    })
    .catch(() => {
      response.status(500).json({
        fav: false
      });
    });
};

module.exports = checkFavourite;
