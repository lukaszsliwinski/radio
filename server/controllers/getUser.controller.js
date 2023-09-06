// get logged username
const getUser = async (request, response) => {
  response.json({
    username: response.locals.user.username // requires auth middleware set in index.js
  });
};

module.exports = getUser;
