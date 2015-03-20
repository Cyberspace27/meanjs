//Invocar el modo JavaScript 'strict'
'use strict';
//Carga las dependencias del modulo
var config = require('./config'),
mongoose = require('mongoose');

//Definir el metodo de configuracion de Mongoose
module.exports = function(){
   //Usar Mongoose para conectar a MongoDB
	var db = mongoose.connect(config.db);

	//Cargar el modelo 'User'
	require('../app/models/user.server.model');
	
	//Devolver la instancia de conexion a mongo
	return db;
};