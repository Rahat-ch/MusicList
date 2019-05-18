const mongoose = require('mongoose');

const Schema = mongoose.Schema; // eslint-disable-line
const passportLocalMonggose = require('passport-local-mongoose');

const User = new Schema({
  username: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
});

User.plugin(passportLocalMonggose);

module.exports = mongoose.model('User', User);
