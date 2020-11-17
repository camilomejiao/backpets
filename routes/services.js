"use strict";

var express = require("express");
var ServicesController = require("../controllers/services");

var api = express.Router();
var auth = require("../middlewares/authenticated");

//Definir Rutas
//Get    //Nombre ruta          //Middleware        //metodo a ejecurar
api.get("/pruebaservices", ServicesController.homeServices);
api.post("/saveServices", auth.authorization, ServicesController.saveServices);
api.get("/getServicesCita", auth.authorization, ServicesController.getServicesCita);
api.get("/getService/:id", auth.authorization, ServicesController.getService);
api.put("/updateServices/:id", auth.authorization, ServicesController.updateServices);
api.delete("/deleteServices/:id", auth.authorization, ServicesController.deleteServices);

module.exports = api;
