const { authenticate } = require('../services/user.service');

// login controller
const login = async (request, response) => {
  const { usernameInput, passwordInput } = request.body;

  try {
    const { username, token } = await authenticate(usernameInput, passwordInput);

    response.status(200).json({
      status: 200,
      message: 'Successfully logged in.',
      username,
      token
    });
  } catch (error) {
    if (error.message === 'User not found') {
      response.status(404).json({
        status: 404,
        message: 'User not found.'
      });
    } else if (error.message === 'Wrong password') {
      response.status(401).json({
        status: 401,
        message: 'Wrong password.'
      });
    } else {
      response.status(500).json({
        status: 500,
        message: 'Internal server error.'
      });
    }
  }
};

module.exports = login;
