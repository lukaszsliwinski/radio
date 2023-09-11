const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const checkFavourite = (request, response) => {
  FavouriteStation.findOne({ id: `${response.locals.user.username}_${request.body.id}` })
    .then((result) => {
      response.json({
        fav: result !== null
      })
    })
    .catch(() => {
      response.json({
        fav: false
      })
    });
};

module.exports = checkFavourite;
