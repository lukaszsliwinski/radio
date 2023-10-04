// get logged username
const getUser = async (request, response) => {
  response.status(200).json({
    username: response.locals.user.username // requires auth middleware set in index.js
  });
};

module.exports = getUser;
