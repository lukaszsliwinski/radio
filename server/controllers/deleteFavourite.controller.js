const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const deleteFavourite = (request, response) => {
  FavouriteStation.findOneAndDelete({ id: `${response.locals.user.username}_${request.body.id}` })
    .then((result) => {
      console.log(result)
      response.json({
        message: 'successfully deleted'
      })
    })
    .catch(() => {

    });
};

module.exports = deleteFavourite;
