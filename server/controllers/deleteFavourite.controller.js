const { findByIdAndDelete } = require('../services/deleteFavourite.service');

// delete station from favourites
const deleteFavourite = (request, response) => {
  findByIdAndDelete(`${response.locals.user.username}_${request.body.id}`)
    .then(() => {
      response.status(200).json({
        status: 200,
        message: 'Station removed from favourites.'
      });
    })
    .catch(() => {});
};

module.exports = deleteFavourite;
