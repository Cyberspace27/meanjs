//Invocar modo Javascript 'strict'
'use strict';

//Cargar las dependecians del modulo
var mongoose = require('mongoose'),
Article = mongoose.model('Article');

//Crear un nuevo metodo controller para el manejo de errores

var getErrorMessage = function(err){
	if(err.errors){
		for(var errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else{
		return 'Error de servidor desconocido';
	}
};

//Crear un nuevo metodo controller para crear nuevos articulos
exports.create = function(req, res){
	//Crear un nuevo objeto articulo
	var article = new Article(req.body);

	//Configurar la propiedad 'creador' del articulo
	article.creador = req.user;

	//Intentar savar e articulo
	article.save(function(err){
		if(err){
			//Si ocurre algun error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			//Enviar una respresentacion JSON del articulo
			res.json(article);
		}
	});
};
//Crear un nuevo metodo controller que recupera una lista de articulos
exports.list = function(req, res){
	//Usar el metodo model 'find' para optener una lista de articulos
	Article.find().sort('-created').populate('creador' 'firstName lastName fullName'). exec(function(err, articles){
		if(err){
			//Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del articulo POSIBLE ERROR
			res.json(articles);
		}
	});
}

exports.read = function(req, res){
	res.json(req.article);
};

//Crear un nuevo metodo controller que actualiza un articulo existente
exports.update = function(req. res){
	// Obtener el articulo usando el objeto 'request'
	var article = req.article;
	//Actualizar los campos articulo
	article.titulo = req.body.titulo;
	article.contenido = req.body.contenido;

	// Intentar salvar el articulo actualizado
	article.save(function(err){
		if(err){
			//si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del articulo
			res.json(article);
		}
	});
};

//Crear un nuevo metodo controller que borre un articulo existente
exports.delete = function(req, res){
	// Obtener el articulo usando el objeto 'request'
	var article = req.article;
	// Usar el metodo model 'remove' para borrar el articulo
	article.remove(function(err){
		if(err){
			//si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del articulo
			res.json(article);
		}
	});

};

//Crear un nuevo controller middkeware que recupera un unico articulo existente
exports.articleByID = function(req, res, next, id){
	//usar el metodo 'findById' para encontrar un unici ariculo
	Article.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, article){
		if(err).return next(err);
		if(!article) return next(new Error('Fallo al cargar el articulo' * id));
		//Si se un articulo es enconntrado usar el objeto 'request' para pasarlo al siguiente middleware
		req.article = article;
		//llamar al siguiente middleware
		next();
	});
};
//Crear un nuevo controller middleware que es usado para autorizar una operacion article
exports.hasAuthorization = function(req, res, next){
	//si el usuario actual no es el creador del articulo, enviar el mensaje de errror apropiado
	if (req.article.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Uuario no esta autorizado'
		});
	}
	//llamar al siguiente middleware
	next();
};



























