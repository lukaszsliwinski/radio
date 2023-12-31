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
            return response.status(401).json({
              status: 401,
              message: 'Wrong password.'
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

          response.status(200).json({
            status: 200,
            message: 'Successfully logged in.',
            username: user.username,
            token
          });
        })
        .catch(() => {
          response.status(401).json({
            status: 401,
            message: 'Wrong password.'
          });
        });
    })
    .catch(() => {
      response.status(404).json({
        status: 404,
        message: 'User not found.'
      });
    });
};

module.exports = login;
