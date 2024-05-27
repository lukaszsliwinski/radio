const { registerUser } = require('../services/user.service');

// register controller
const register = async (request, response) => {
  const { usernameInput, passwordInput } = request.body;

  try {
    await registerUser(usernameInput, passwordInput);
    response.status(201).json({
      status: 201,
      message: 'Account successfully created.'
    });
  } catch (error) {
    if (error.message === 'Incorrect username format') {
      response.status(400).json({
        status: 400,
        message: 'Incorrect username format.'
      });
    } else if (error.message === 'Incorrect password format') {
      response.status(400).json({
        status: 400,
        message: 'Incorrect password format.'
      });
    } else if (error.message === 'Account already exists') {
      response.status(422).json({
        status: 422,
        message: 'Account already exists.'
      });
    } else {
      response.status(500).json({
        status: 500,
        message: 'Error creating account. Please try again later.'
      });
    }
  }
};

module.exports = register;
