
var config = require('./config'),
	express = require('express'),
	db = require('../app/db'), // Connect to db.
	passport = require('passport');

require('./auth').setupPassport();

// Do express configuration and middleware

module.exports = function(app) {


	app.configure(function(){
		app.set('port', config.port);
		app.set('views', __dirname + '/../app/views');
		app.set('view engine', 'jade');
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(passport.initialize());
		app.use(app.router);
		app.use(express.static(__dirname + '/../public'));
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
	});

};

