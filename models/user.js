'use stric'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  nick: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  google: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", UserSchema);
