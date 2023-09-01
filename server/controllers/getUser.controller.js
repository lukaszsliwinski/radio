// get logged username
const getUser = async (request, response) => {
  response.json({
    user: response.locals.user // requires auth middleware set in index.js
  });
};

module.exports = getUser;
