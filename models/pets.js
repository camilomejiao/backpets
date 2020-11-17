'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PetsSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
  },  
  edad: {
    type: Number,
  },
  tamano: {
    type: Number,
  },
  raza: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  vacunas: {
    type: Boolean,
    default: false,
  },
  tipo_vacuna: {
    type: String,
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

var Pets = module.exports = mongoose.model('Pets', PetsSchema);