"use strict";

var express = require("express");
var PetsController = require("../controllers/pets");

var api = express.Router();
var auth = require("../middlewares/authenticated");

var multipart = require('connect-multiparty');
var upload = multipart({ uploadDir: './uploads/pets'});

//Definir Rutas
//Get    //Nombre ruta          //Middleware        //metodo a ejecurar
api.get("/pruebapets", PetsController.pruebapets );
api.post("/savePets", auth.authorization, PetsController.savePets);
api.get("/getPets", auth.authorization, PetsController.getPets);
api.get("/getPet/:id", auth.authorization, PetsController.getPet);
api.put("/updatePet/:id", auth.authorization, PetsController.updatePet);
api.delete("/deletePet/:id", auth.authorization, PetsController.deletePet);

//Image //POST
api.post("/uploadImage/:id", [auth.authorization, upload], PetsController.uploadImage);
//
api.get('/get-image/:imageFile', PetsController.getImageFile);


module.exports = api;