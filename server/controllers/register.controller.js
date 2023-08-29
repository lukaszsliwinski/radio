const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

// username limitations
const userSchema = new passwordValidator();
userSchema.is().min(3).is().max(15).has().not().spaces();

// password limitations
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

// register controller
const register = (request, response) => {
  // validate username and password
  if (!userSchema.validate(request.body.usernameInput)) {
    response.status(400).send({
      item: 'username',
      message: 'incorrect username format'
    });
  } else if (!passwordSchema.validate(request.body.passwordInput)) {
    console.log('handle incorrect password format');
    response.status(400).send({
      item: 'password',
      message: 'incorrect password format'
    });
  } else {
    bcrypt
      .hash(request.body.passwordInput, 10)
      .then((hashedPassword) => {
        const user = new User({
          username: request.body.usernameInput,
          password: hashedPassword
        });
        // save new user to database
        user
          .save()
          .then((result) => {
            response.status(201).send({
              message: 'Account successfully created!',
              result
            });
          })
          .catch((error) => {
            if (error.code === 11000) {
              response.status(422).send({
                item: 'username',
                message: 'account already exist',
                error
              });
            } else {
              response.status(500).send({
                message: 'error creating account',
                error
              });
            }
          });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'password was not hashed successfully',
          error
        });
      });
  }
};

module.exports = register;
