//Invocar el modo JavaScript 'strict'
'use strict';

//cargar el modulo mongoose y el objeto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 //Definir un nuevo  'UserSchema'
 var UserSchema = new Schema({
 	firstName: String,
 	lastName: String,
 	email: String,
 	username: String,
 	password: String
 });

 //Crear el modelo 'user' a partir del 'UserSchema'
 mongoose.model('User', UserSchema);