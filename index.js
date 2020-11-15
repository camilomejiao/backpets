"use strict";

//Instanciamos mongoose
var mongoose = require("mongoose");
//Llamamos app.js
var app = require("./app");
//Llamamos el puerto
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/UbitsPets").then(() => {
    console.log("La conexion se ha establecido exitosamente");

    //Crear Servidor
    app.listen(port, () => {
      console.log("Servidor corriendo en http://localhost:3800");
    });
  })
  .catch((err) => console.log(err));
