const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

// password limitations
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

// find user in database by username, hash new password and update
const changePassword = async (request, response) => {
  if (!passwordSchema.validate(request.body.passwordInput)) {
    response.status(400).json({
      status: 400,
      message: 'Incorrect password format.'
    });
  } else {
    bcrypt
      .hash(request.body.passwordInput, 10)
      .then((hashedPassword) => {
        User.findOneAndUpdate(
          { username: response.locals.user.username },
          { password: hashedPassword }
        )
          .then(() => {
            response.status(201).json({
              status: 201,
              message: 'Password successfully changed.'
            });
          })
          .catch(() => {
            response.status(500).json({
              status: 500,
              message: 'Error changing password.'
            });
          });
      })
      .catch(() => {
        response.status(500).json({
          status: 500,
          message: 'Password was not hashed successfully.'
        });
      });
  }
};

module.exports = changePassword;
