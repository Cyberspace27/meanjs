//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el controller 'user'

var users = require('../../app/controllers/users.server.controller');

// define el metodo routes module
module.exports = function(app){
	//set up the 'users' base routes
	app.route('/users')
	.post(users.create)
	.get(users.list);
	app.route('/users/:userId')
	.get(users.read)
	.put(users.update)
	.delete(users.delete);

	//configura el parametro middleware 'userId'
	app.param('userId', users.userByID);
};