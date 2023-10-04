const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'provide an username'],
    unique: [true, 'username exists']
  },

  password: {
    type: String,
    required: [true, 'provide a password'],
    unique: false
  }
});

module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);
