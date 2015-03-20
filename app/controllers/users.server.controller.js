//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el modelo mongoose 'user'
var User = require('mongoose').model('User');

//crear un nuevo metodo controller'create'
exports.create = function(req, res, next){
	//Crear una nueva instancia del modelo monngoose ' User'
	var user = new User(req.body);
	//Usar el metodo 'save' de la instancia 'User' para salvar un nuevo documento user
	user.save(function(err){
		if(err){
		   //llamar el siguiente meddleware con un mensaje de error
		   return next(err);
		}else{
			//Usar el objeto 'response' para enviar una respuesta JSON
			res.json(user);
		}
	});
};
