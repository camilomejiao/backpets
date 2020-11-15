"use strict";

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var Pets = require("../models/pets");
var fs = require("fs");
var path = require('path');

//Pruebas
function pruebapets(req, res){
    res.status(200).send({
        message: 'Accion de pruebas en el servidor Node.Js, Hola Controlador Pets!'
    });
}

function savePets(req, res) {
  //Creamos el objeto
  var pets = new Pets();
  //Recogemos parametros
  var params = req.body;

  //console.log(params);
  //console.log(req.user.sub);

  if (params.nombre && params.tipo) {
    //Asignamos los valores
    pets.nombre = params.nombre;
    pets.tipo = params.tipo;
    pets.edad = params.edad;
    pets.raza = params.raza;
    pets.descripcion = params.descripcion;    
    pets.vacunas = params.vacunas;
    pets.tipo_vacuna = params.tipo_vacuna;
    pets.image = null;
    pets.user = req.user.sub;   

    pets.save((err, petsStore) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!petsStore) {
          res.status(404).send({ message: "No se ha guardado la mascota" });
        } else {
          res.status(200).send({ pets: petsStore });
        }
      }
    });
  } else {
    res.status(200).send({
      message: "El nombre y tipo es obligatorio",
    });
  }
}

//Listar todos los usuarios paginado
function getPets(req, res){
    Pets.find({}).populate({ path: 'user'}).exec((err, pets) => {
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if (!pets) {
                res.status(404).send({
                    message: 'No hay animales'
                });
            }else {
                res.status(200).send({
                    pets
                });
            }
        }  
    });
}

function getPet(req, res) {
  var petId = req.params.id;

  Pets.findById(petId).populate({ path: "user" }).exec((err, pet) => {
      if (err) {Pets
        res.status(500).send({
          message: "Error en la petición",
        });
      } else {
        if (!pet) {
          res.status(404).send({
            message: "El pet no exite",
          });
        } else {
          res.status(200).send({
            pet,
          });
        }
      }
    });
}

function updatePet(req, res) {
  //
  var petId = req.params.id;
  //
  var update = req.body;
  //console.log(update);

  Pets.findByIdAndUpdate(petId, update, (err, petUpdate) => {
    if (err) {
      res.status(500).send({
        message: "Error en la petición",
      });
    } else {
      if (!petUpdate) {
        res.status(404).send({
          message: "No se ha actualizado el Pets",
        });
      } else {
        res.status(200).send({ Pet: petUpdate });
      }
    }
  });
}

function deletePet(req, res) {
  var petId = req.params.id;

  Pets.findByIdAndRemove(petId, (err, petRemove) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!petRemove) {
        res.status(404).send({ message: "No se ha borrado el Pets" });
      } else {
        res.status(200).send({ Pet: petRemove });
      }
    }
  });
}

function uploadImage(req, res) {
  //res.status(200).send({message: 'Upload Image'});
  var petId = req.params.id;
  var file_name = "No subido....";

  console.log(req.files);

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split("\\");
    var file_name = file_split[2];

    var ext_split = file_name.split(".");
    var file_ext = ext_split[1];

    if (file_ext == "png" || file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif") {
      Pets.findByIdAndUpdate(
        petId,
        { image: file_name },
        { new: true },
        (err, petUpdated) => {
          if (err) {
            res.status(500).send({
              message: "Error al actualizar pet",
            });
          } else {
            if (!petUpdated) {
              res.status(404).send({ message: "No se ha podido actualizar  el pet" });
            } else {
              res.status(200).send({ equipo: petUpdated, image: file_name });
            }
          }
        }
      );
    } else {
      fs.unlink(file_path, (err) => {
        if (err) {
          res.status(200).send({ message: "Extensión no valida Y fichero no borrado" });
        } else {
          res.status(200).send({ message: "Extensión no valida" });
        }
      });
    }
  } else {
    res.status(200).send({ message: "No se ha subido archivo" });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = "./uploads/pets/" + imageFile;

  fs.exists(path_file, function (exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(404).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  pruebapets,
  savePets,
  getPets,
  getPet,
  updatePet,
  deletePet,
  uploadImage,
  getImageFile,
};
