//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el controller 'user'

var users = require('../../app/controllers/users.server.controller'),
passport = require('passport');

// define el metodo routes module
module.exports = function(app){
	//Configura las ritas 'signup'
	app.route('/signup')
	.get(users.renderSignup)
	.post(users.signup);

	//Configurar las routes 'signin'
	app.route('/signin')
	.get(users.renderSignin)
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true

	}));
    
	//Configurar las route 'signout'
    app.get('/signout', users.signout);
};