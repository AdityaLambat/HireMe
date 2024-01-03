const mongoose = require('mongoose')

const users = mongoose.model('users', {
  fname: String,
  lname: String,
  email: String,
  mobile: String,
  password: String,
  isVerified: Boolean
});

module.exports = users