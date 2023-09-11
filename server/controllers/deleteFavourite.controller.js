const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const deleteFavourite = (request, response) => {
  FavouriteStation.findOneAndDelete({ id: `${response.locals.user.username}_${request.body.id}` })
    .then((result) => {
      console.log('response')
      response.json({
        fav: false
      })
    })
    .catch(() => {

    });
};

module.exports = deleteFavourite;
