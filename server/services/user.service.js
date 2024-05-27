const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const validateUsernameFormat = (username) => {
  return userSchema.validate(username);
};

const validatePasswordFormat = (password) => {
  return passwordSchema.validate(password);
};

// function used in register controller
const registerUser = async (username, password) => {
  if (!validateUsernameFormat(username)) {
    throw new Error('Incorrect username format');
  }

  if (!validatePasswordFormat(password)) {
    throw new Error('Incorrect password format');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword
  });

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Account already exists');
    } else {
      throw new Error('Error creating account');
    }
  }
};

// function used in login controller
const authenticate = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error('Wrong password');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    return { username: user.username, token };
  } catch (error) {
    throw error;
  }
};

// function used in changePassword controller
const changePasswordByUsername = async (username, password) => {
  if (!validatePasswordFormat(password)) {
    throw new Error('Incorrect password format');
  }

  // find user in database by username, hash new password and update
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate({ username }, { password: hashedPassword });

  if (!user) {
    throw new Error('User not found');
  }
};

module.exports = {
  registerUser,
  authenticate,
  changePasswordByUsername
};
