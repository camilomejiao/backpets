"use strict";

var bcrypt = require("bcrypt-nodejs");
var Shop = require("../models/shop");

//Pruebas
function shop(req, res) {
  res.status(200).send({
    message:
      "Accion de pruebas en el servidor Node.Js, Hola Controlador Shop!",
  });
}

//Resgistro
function saveShop(req, res) {
  var shop = new Shop();
  var params = req.body;
  //console.log(params);

    if (params.titulo && params.categoria && params.cantidad && params.valor) {
        shop.titulo = params.titulo;
        shop.categoria = params.categoria;
        shop.cantidad = params.cantidad;
        shop.descripcion = params.descripcion;
        shop.valor = params.valor;
        shop.image = null;
        shop.user = req.user.sub;

        //Comproba usuarios duplicados.
        shop.save((err, shopStore) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!shopStore) {
            res.status(404).send({ message: "No se ha guardado el shop" });
            } else {
            res.status(200).send({ services: shopStore });
            }
        }
        });
    } else {
        res.status(200).send({
        message: "Envia todos los campos necesarios!!",
        });
    }
}

//Listar todos los usuarios paginado
function getShops(req, res) {
    Shop.find({}).populate().exec((err, shop) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición",
        });
      } else {
        if (!shop) {
          res.status(404).send({
            message: "No hay animales",
          });
        } else {
          res.status(200).send({
            success: "true",
            shop: shop
          });
        }
      }
    });
}

//Listar datos de usuario
function getShop(req, res) {
  var shopId = req.params.id;

  Shop.findById(shopId, (err, shop) => {
    if (err) {
      return res.status(500).send({ message: "Error en la petición" });
    }
    if (!shop) {
      return res.status(404).send({ message: "El usuario no existe" });
    } else {
      return res.status(200).send({ shop });
    }
  });
}

function updateShop(req, res) {
  //
  var shopId = req.params.id;
  //
  var update = req.body;
  //console.log(update);

    Shop.findByIdAndUpdate(shopId, update, (err, shopUpdate) => {
        if (err) {
        res.status(500).send({
            message: "Error en la petición",
        });
        } else {
        if (!shopUpdate) {
            res.status(404).send({
            message: "No se ha actualizado el Shop",
            });
        } else {
            res.status(200).send({ service: shopUpdate });
        }
        }
    });
}

function deleteShop(req, res) {
    var shopId = req.params.id;

    Shop.findByIdAndRemove(shopId, (err, shopRemove) => {
        if (err) {
        res.status(500).send({ message: "Error en la petición" });
        } else {
        if (!shopRemove) {
            res.status(404).send({ message: "No se ha borrado el Shop" });
        } else {
            res.status(200).send({ service: shopRemove });
        }
        }
    });
}

module.exports = {
  shop,
  saveShop,
  getShops,
  getShop,
  updateShop,
  deleteShop
};
