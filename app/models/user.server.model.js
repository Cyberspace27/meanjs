//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el modulo mongoose y el objeto Schema
var mongoose = require('mongoose'),
	crypto = require('crypto'),
    Schema = mongoose.Schema;

 //Definir un nuevo  'UserSchema'
 var UserSchema = new Schema({
 	firstName: String,
 	lastName: String,
 	email: {
 		type:String,
 		//validar el formato email
 		match:[/.+\@.+\..+/, "Please fill a valid e-mail address"]
 	},
 	username: { 
 		type:String,
 		//Confiurar un unico index 'username'
 		unique: true,
 		//validar existenia del valor 'username'
 		required: 'Username is required',
 		//Trim el campo 'username'
 		trim:true
 	},
 	password: {
 		type:String,
 		//Validar el valor length de 'password'
 		validate: [
 		function(password){
 			return password && password.length > 6;
 		}, 'Password should be longer'
 		]
 	},
 	salt: {
 		type: String
 	},
 	provider:{
 		type: String,
 		 //Valiadr existencia valor Provider
 		required: 'Provider is required'
 	},

 	providerId: String,
 	providerData: {},
 	created: {
 		type: Date,
 		//Crear un valor 'created' por defecto
 		default: Date.now
 	}
 });
//Confiurar la propiedad virtual 'fullname'
UserSchema.virtual('fullName').get(function(){
	return this.firstName + ' '+this.lastName;

}).set(function(fullName){
	var splitName = fullName.split('');
	this.firstName = splitName[0]|| '';
	this.lastName = splitName[1]|| '';
});

//Usar un middleware pre-save ara hash la contraseña
UserSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

//Crear un metodo instancia para hashing una contraseña
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf25ync(password, this.salt, 10000, 64).toString('base64');
};
//Crear un metodo instancia para auntenticar usario
UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

//Encontrar posibles userna no usados
UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this ;

 	// Añadir un sufijo 'username'
 	var possibleUsername = username + (suffix || '');
 	//usar el metodo 'findOne' del model 'user' para encontrar un username unico disponible

 	_this.findOne({
 		username:possibleUsername
 	}, function(err, user){
 		//si ocurre un error llama al callback con un valor null, en ontro caso encuentra un
 		if(!err){

 			//si un username unico disponible fue encontrado llama al metodo callback, en otro
 			if(!user){
 				callback(possibleUsername);
 		}else{
 			return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
 		}
 	}else{
 		callback(null);
 	}		
 	});
};
































