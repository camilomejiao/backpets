"use strict";

var express = require("express");
var ShopController = require("../controllers/shop");

var api = express.Router();
var auth = require("../middlewares/authenticated");

//Definir Rutas
//Get    //Nombre ruta          //Middleware        //metodo a ejecurar
api.get("/shop", ShopController.shop);
api.post("/saveShop", auth.authorization, ShopController.saveShop);
api.get("/getShops", auth.authorization, ShopController.getShops);
api.get("/getShop/:id", auth.authorization, ShopController.getShop);
api.put("/updateShop/:id", auth.authorization, ShopController.updateShop);
api.delete("/deleteShop/:id", auth.authorization, ShopController.deleteShop);

module.exports = api;
