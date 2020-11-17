"use strict";

var express = require("express");
var UserController = require("../controllers/user");

var api = express.Router();
var auth = require("../middlewares/authenticated");

//Definir Rutas
api.get("/home", UserController.home);
api.post("/register", UserController.saveUser);
api.get("/usuarios", auth.authorization, UserController.getUsers);
api.get("/usuario/:id", auth.authorization, UserController.getUser);
api.post("/login", UserController.loginUser);
api.post("/google", UserController.google);

module.exports = api;
