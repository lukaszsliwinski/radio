const { changePasswordByUsername } = require('../services/user.service');

// change password controller
const changePassword = async (request, response) => {
  const { passwordInput } = request.body;
  const username = response.locals.user.username;

  try {
    await changePasswordByUsername(username, passwordInput);
    response.status(201).json({
      status: 201,
      message: 'Password successfully changed.'
    });
  } catch (error) {
    if (error.message === 'Incorrect password format') {
      response.status(400).json({
        status: 400,
        message: 'Incorrect password format.'
      });
    } else if (error.message === 'User not found') {
      response.status(404).json({
        status: 404,
        message: 'User not found.'
      });
    } else {
      response.status(500).json({
        status: 500,
        message: 'Error changing password.'
      });
    }
  }
};

module.exports = changePassword;
