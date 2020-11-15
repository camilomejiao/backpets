'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var fs = require('fs');
//var path = require('path');
var jwt = require('../services/jwt');

//Pruebas
function home(req, res){
    res.status(200).send({
        message: 'Accion de pruebas en el servidor Node.Js, Hola Controlador!'
    });
}

//Resgistro
function saveUser(req, res){
    var params = req.body;
    //console.log(params);
    var user = new User();

    if (params.name && params.lastname && params.nick && params.email && params.password ) {        
        user.name = params.name;
        user.lastname = params.lastname;
        user.nick = params.nick;
        user.email = params.email;        
        user.image = null;
        user.google = false;

        //Comproba usuarios duplicados.
        User.find({ $or: [
                            {email: user.email.toLowerCase()},
                            {nick: user.nick.toLowerCase()}
                         ]
                 }).exec((err, users) => {
                    if (err) {
                        return res.status(500).send({ message: 'Error en la peticion de usuarios'});
                    }
                    if (users && users.length >= 1) {
                        return res.status(200).send({ message: 'El usuario o Email ya se encuentran registrados'});
                    } else {

                        //Cifrar y guardar datos.
                        bcrypt.hash(params.password, null, null, (err, hash) => {
                            user.password = hash;
                            user.save((err, userStored) => {
                                if (err) {
                                    return res.status(500).send({
                                        message: 'Error al guardar el usuario'
                                    });
                                }
                                if (userStored) {
                                      return res.status(200).send({
                                        token: jwt.createToken(user),
                                        user: userStored,
                                      });      
                                    //res.status(200).send({user: userStored});
                                } else {
                                    res.status(404).send({message: 'No se ha registrado el usuario'});
                                }
                            });
                        });
                     }
                 });
            } else {
                res.status(200).send({
                    message: 'Envia todos los campos necesarios!!'
                });
            }
}

//Login
function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password =  params.password;

    //Modelo User()
    User.findOne({email: email}, (err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, check) =>{
                if (check) {
                    if (params.getToken) {
                        //Generar y devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });                        
                    } else {
                        //Devolver datos de usuario
                        user.password = undefined;
                        return res.status(200).send({
                          token: jwt.createToken(user),
                          user: user,
                        });                                                
                        //return res.status(200).send({ user });
                    }
                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido identificar!'});
                }
            });
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        }
    });
}

//Listar todos los usuarios paginado
function getUsers(req, res) {
  User.find({})
    .populate()
    .exec((err, users) => {
      if (err) {
        res.status(500).send({
          message: "Error en la petición",
        });
      } else {
        if (!users) {
          res.status(404).send({
            message: "No hay animales",
          });
        } else {
          res.status(200).send({
            users,
          });
        }
      }
    });
}

//Listar datos de usuario
function getUser(req, res){
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }
        if (!user) {
          return res.status(404).send({ message: "El usuario no existe" });
        } else {
            return res.status(200).send({ user });
        }
    });    
}

module.exports = {
  home,
  saveUser,
  loginUser,
  getUsers,
  getUser
};