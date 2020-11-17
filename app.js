"use strict";

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static("public"));

app.use(bodyParser.json());

//Cargar Rutas
var user_routes = require("./routes/user");
var pets_routes = require("./routes/pets");
var services_routes = require("./routes/services");
var shop_routes = require("./routes/shop");

//Middlewares //Son metodos que se ejecutan antes de llegar al controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors configuracion de cabeceras http
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

//Rutas
app.use("/api", user_routes);
app.use("/api", pets_routes);
app.use("/api", services_routes);
app.use("/api", shop_routes);

//Exportar
module.exports = app;
