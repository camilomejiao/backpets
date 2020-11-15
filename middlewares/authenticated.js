"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "clave_secreta";

//Creamos la funcion
exports.authorization = function (req, res, next) {
  //validamos si trae o no el token
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La peticion no tiene la cabecera de autenticacion" });
  }

  var token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: "El token ha expirado",
      });
    }
  } catch (ex) {
    return res.status(404).send({
      message: "El token no es valido",
    });
  }

  req.user = payload;

  next();
};
