//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el modulo dependecies
var User = require('mongoose').model('User'),
passport = require('passport');
//crear un nuevo metodo controller manejador de errores

var getErrorMessage = function(err){
	//Definir la variable de error message
	var message = '';

	//si un error interno de MongoDB ocurre obtener el mesaje de error
	if(err.code){
		switch(err.code){
			// Si un error de index ocurre configurar el mensaje de error
			case 11000:
			case 11001:
			message = 'Usuario ya existete';
			break;
			// Si un error de general ocurre configurar el mensaje de error
			default:
			message = 'se ha producido un error';
		}
	}else{
		//Grabar el primer mensaje de error de una lista de posible errores
		for (var errName in err.errors) {
			if(err.errors[errName].message) message = err.errors[errName].message;

		}
	}
	//Devolver el mensaje de error
	return message;
};
//crear un nuevo metodo controller que renderiza la pagina signin
exports.renderSignin = function(req, res, next){
	// si el usuario no esta conectado renderizar la pagina signin, en otro caso redirecionar el usuario
	if(!req.user){
		// Usa el objeto 'response' para renderizar la pagia signin
		res.render('signin', {
			title: 'Sign-in Form',
			//Configurar la variable del mensaje de flash
			messages: req.flash('error') || req.flash('info')
		});
	} else{
		return res.redirect('/');
	}
};
//Crear un nuevo metodo controller que renderiza la pagina signup

exports.renderSignup = function(req, res, next){
	// si el usario no esta conectado renderizar la pagina signin, e otro caso redirecionar al usario
	if(!req.user){
		//Usa el objeto 'response' para renderzar la pagia signup
		res.render('signup', {
			title: 'Sign-up Form',
			//Configura la variable flash
			messages:req.flash('error')
		});
	}else{
		return res.redirect('/');
	}
};

//crear un nuevo metodo controller que crea nuevos users 'regular'
exports.signup = function(req, res, next){
	//Si user no esta conectado, crear y hacer login a un nuevo usuario, en otro caso redirecionar el user de vuelta a la pagina principal de la aplicaio
	if (!req.user) {
		//crear una nueva instancia del modelo 'User'
		var user = new User(req.body);
		var message = null;
		//Configurar la propiedad user provider
		user.provider = 'local';
		//Intenta salvar el nuevo documento user
		user.save(function(err){
			//Si  ocurre un error, usa el mensaje flash para reportar el error
			if(err){
				//usa el metodo de mmanejo de errores para obtener el mensaje de error
				var message = getErrorMessage(err);
				//Configurar los mensajes flash
				req.flash('error', message);
				//Redirecciona al usuario de vuelta a la pagina signup
				return res.redirect('/signup');
			}
			//Si el usuario fue creado de modo correcto usa el metodo 'login' de passport para hacer login
			req.login(user, function(err){
				//si ocurre un error de login moverse al siguiente middleware
				if(err)return next(err);
				//redirecionar el usuario de vuelta a la pagina de la aplicacion principal
				return red.redirect('/')
			});
		});

	}else{
		return red.redirect('/');
	}

};


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

//crear un nuevo metodo controller para signing out
exports.signout = function(req, res){
	//Usa el metodo 'logout' de passport para hacer logout
	req.logout();
	//Rendirecciona al usuario de vuelta a la pagina de la aplicacion principal
	res.redirect('/')
};




