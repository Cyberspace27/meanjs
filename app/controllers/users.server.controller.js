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

//Crear un nuevo metodo controller 'list'
 exports.list = function(req, res, next){
 	//Usa el metodo static 'User' 'find' para recuperar la lista de usuarios
 	User.find({}, 'username email', function(err, users){
 		if(err){
 			//llama el siguiente middleware con un mensaje de error
 			return next(err);
 		}else{
 			//Usa el objeto 'response' para enviar una respuesta JSON
 			res.json(users);

 		}
 	});
 };
//Creamos un nuevo metodo controller
exports.read = function(req, res){
	//Usa el objeto 'response' para enviar una respueta JSON
	res.json(req.user);
};
// Crear un nuevo metodo controller 'update'
exports.update = function(req, res, next){
	//Usa el metodo static 'findByAndUdate' de 'User' para actualizar
	User.findByAndUdate(req.user.id, req.body, function(err, user){
		if(err){
			//Llama al siguiente middleware con un mesaje de error
			return next(err);
		}else{
			//Usa el objeto 'response' para enviar una respuesta JSON
			res.json(user);
		}
	});
};

// Crear un nuevo metodo controller 'delete'
exports.delete = function(req, res, next){
	//usamos el metodo 'remove' de la instancia 'User' para eiminar un documento
	req.user.remove(function(err){
		if(err){
			//Llama al siguiente middleware con un mesaje de error
			return next(err);
		}else{
			//usa el objeto 'response' para eviar una respuesta JSON
			res.json(req.user);
		}

	});
};



// Crear un nuevo metodo controller 'userByID'
exports.userByID = function(req, res, next, id){
	//Usa metodo static 'findOne' de 'User' para recuperar un suario especifico
	User.findOne({
		_id: id
	}, function(err, user){
		if(err){
		//Llama al siguiente middleware con un mesaje de error
		return next(err);
	}else{
		//Configura la propiedad 'req.user'
		req.user = user;
		//llama al siguiente middleware
		next(); 
	}

	});
	
};






