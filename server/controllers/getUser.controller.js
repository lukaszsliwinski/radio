// get logged username
const getUser = async (request, response) => {
    response.json({
      user: response.locals.user // requires auth middleware set in server.js
    });
  };
  
  module.exports = getUser;
  