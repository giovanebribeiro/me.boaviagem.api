'use strict';

const Mongoose = require('mongoose');

module.exports = function(server){

  var host = process.env.DB_HOST || 'localhost';
	var port = process.env.DB_PORT || 27017;
	var user = process.env.DB_USER || '';
	var pass = process.env.DB_PASS || '';
	var name = 'me_boaviagem_api_' + process.env.NODE_ENV;

	if (user !== '' && pass === '') {
	  throw new Error("If DB user (" + user + ") is not empty, DB password can't be empty.");
	}

	if (user === '' && pass !== '') {
	  throw new Error("If DB password (" + pass + ") is not empty, DB user can't be empty.");
	}

	var mongoUrl = 'mongodb://';
	if(user !== '') mongoUrl += user + ':' + pass + '@';

	mongoUrl += host + ':' + port + '/' + name;

	//var conn = Mongoose.createConnection(mongoUrl);
	Mongoose.connect(mongoUrl);

	Mongoose.connection.on('connected', function() {
	  server.log("info", "Database connected successfully.");
	});

	Mongoose.connection.on('error', function() {
	  server.log("error", "Error connection with database");
	});

	Mongoose.connection.on('disconnected', function() {
	  server.log("info", "Database disconnected successfully.");
	});

};
  
