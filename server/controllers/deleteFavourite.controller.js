const FavouriteStation = require('../models/favouriteStation.model');

// add station to favourites
const deleteFavourite = (request, response) => {
  FavouriteStation.findOneAndDelete({ id: `${response.locals.user.username}_${request.body.id}` })
    .then(() => {
      response.status(200).json({
        status: 200,
        message: 'successfully deleted'
      });
    })
    .catch(() => {});
};

module.exports = deleteFavourite;
