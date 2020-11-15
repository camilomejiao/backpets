"use strict";

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var Services = require("../models/services");

//Pruebas
function homeServices(req, res) {
  res.status(200).send({
    message: "Accion de pruebas en el servidor Node.Js, Hola Controlador Services!",
  });
}

//Resgistro
function saveServices(req, res) {

  var services = new Services();
  var params = req.body;
  //console.log(params);  

  if (params.nombre && params.fecha) {
    services.nombre = params.nombre;
    //La forma de enviar la fecha es 'año-mes-dia'
    services.fecha = params.fecha;
    services.user = req.user.sub;

    //Comproba usuarios duplicados.                                                                                                                  
    services.save((err, serviceStore) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!serviceStore) {
          res.status(404).send({ message: "No se ha guardado la mascota" });
        } else {
          res.status(200).send({ services: serviceStore });
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
function getServices(req, res) {
  Services.find({})
    .populate()
    .exec((err, services) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición",
        });
      } else {
        if (!services) {
          res.status(404).send({
            message: "No hay animales",
          });
        } else {
          res.status(200).send({
            services,
          });
        }
      }
    });
}

//Listar datos de usuario
function getService(req, res) {
  var servicesId = req.params.id;

  Services.findById(servicesId, (err, services) => {
    if (err) {
      return res.status(500).send({ message: "Error en la petición" });
    }
    if (!services) {
      return res.status(404).send({ message: "El usuario no existe" });
    } else {
      return res.status(200).send({ services });
    }
  });
}

function updateServices(req, res) {
  //
  var servicesId = req.params.id;
  //
  var update = req.body;
  //console.log(update);

    Services.findByIdAndUpdate(servicesId, update, (err, servicesUpdate) => {
        if (err) {
        res.status(500).send({
            message: "Error en la petición",
        });
        } else {
        if (!servicesUpdate) {
            res.status(404).send({
            message: "No se ha actualizado el Services",
            });
        } else {
            res.status(200).send({ service: servicesUpdate });
        }
        }
    });
}

function deleteServices(req, res) {
  var servicesId = req.params.id;

  Services.findByIdAndRemove(servicesId, (err, servicesRemove) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!servicesRemove) {
        res.status(404).send({ message: "No se ha borrado el Services" });
      } else {
        res.status(200).send({ service: servicesRemove });
      }
    }
  });
}

module.exports = {
  homeServices,
  saveServices,
  getServices,
  getService,
  updateServices,
  deleteServices
};
