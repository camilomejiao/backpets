"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ServicesSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  pet: {
    type: Schema.ObjectId,
    ref: "Pets",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

var Services = (module.exports = mongoose.model("Services", ServicesSchema));
