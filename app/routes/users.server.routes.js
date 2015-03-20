//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el controller 'user'

var users = require('../../app/controllers/users.server.controller');

// define el metodo routes module
module.exports = function(app){
	//set up the 'users' base routes
	app.route('/users').post(users.create);
};