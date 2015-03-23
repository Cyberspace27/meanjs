var passport = require('passport'),
localStrategy = require('passport-local').Strategy,
User = require('mongoose').model('User');

module.exports = function(){
	passport.use(new localStrategy(function(username, password, done){
		User.findOne({
			username:username
		}, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false,{
					message: 'Usuaio Desconocido'
				});
			}
			if(!user.authenticate(password)){
				return done(null, false,{
					message: 'Contraseña Invalida'
				});
			}
			return done(null, user);
		});
	}));
};