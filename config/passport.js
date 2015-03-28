//Invocar modo JavaScript 'strict'
'use strict';
//Cargar las despendecias de modulos
var passport = require('passport'),
	mongoose = require('mongoose');


//Definir el metodo de configuracion de passport
module.exports = function(){
	//Cargar el modelo 'User'
	var User = mongoose.model('User');
	//Usar el metodo 'serializeUser' para serializar la id del usuario
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user){
			done(err, user);
		});
	});
	
	//Cargar los archivos de configuracion de estrategias de passport
	require('./strategies/local.js')();
	require('./strategies/google.js')();
};