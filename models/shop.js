"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShopSchema = mongoose.Schema({
    
  titulo: {
    type: String,
    require: true,
  },
  categoria: {
    type: String,
    require: true,
  },
  cantidad: {
    type: Number,
    require: true,
  },
  descripcion: {
    type: String,
  },
  valor: {
    type: Number,
  },    
  image: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

var Shop = (module.exports = mongoose.model("Shop", ShopSchema));
