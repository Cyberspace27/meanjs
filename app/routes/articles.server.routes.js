//Invocar modo JavaScript 'strict'

'use strict';
//Cargar las dependencias del modulo
var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

//Definir el metodo routers de module
module.exports = function(app){
	//Configurar la rutas 'articles' parametrizadas
  app.route('/api/articles')
	.get(articles.list)
	.post(users.requiresLogin, articles.create);
	//Configurar las rutas 'article' parametrizadas
  app.route('/api/articles/:articleId')
	.get(articles.read)
	.put(users.requiresLogin, articles.hasAuthorization, articles.update)
	.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	//Configurar el parametro middleware 'articleId'
	app.param('articleId', articles.articleByID);
};