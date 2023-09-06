const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

// login controller
const login = (request, response) => {
  User.findOne({ username: request.body.usernameInput })
    .then((user) => {
      bcrypt
        .compare(request.body.passwordInput, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.send({
              status: 400,
              message: 'wrong password',
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          response.send({
            status: 200,
            message: 'Successfully logged in!',
            username: user.username,
            token
          });
        })
        .catch(() => {
          response.send({
            status: 400,
            message: 'wrong password'
          });
        });
    })
    .catch(() => {
      response.send({
        status: 404,
        message: 'user not found'
      });
    });
};

module.exports = login;
