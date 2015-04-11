//Invocar el modo 'strict' de JavaScript mode
'use strict';

var config = require('./config'),
 express = require('express'),
 morgan = require('morgan'),
 compress = require('compression'),
 bodyParser = require('body-parser'),
 methodOverride = require('method-override'),
 session = require('express-session'),
 flash = require('connect-flash'),
 passport = require('passport');
//definir el metodo de configuracion de express
module.exports= function(){
	//crear una nueva instancia de la aplicacion express
	var app = express();
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));

	}else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	//Configuracion el motor view de a aplicacion y el directorio viwes
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	//Cargar los archivos de enrutamiento 
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);


	//Configurar el servidor de archivos estaticos
	app.use(express.static('./public'));
	//Devolver la instancia de la aplicacion Express
	return app;
};