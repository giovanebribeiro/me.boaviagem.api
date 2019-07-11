'use strict';

const Hapi = require('hapi');
const debug = require('debug')('me.boaviagem.api:server.js');
const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');

const server = Hapi.server({
  host: 'localhost',
  port: 8051
});

// source: https://gist.github.com/kethinov/6658166
const myReadDir = function(dir, fileList){

  var files = fs.readdirSync(dir);
  fileList = fileList || [];
  files.forEach(function(file){
    var temp = path.join(dir, file);
    if(fs.statSync(temp).isDirectory()){
      temp = path.join(dir, file, '/');
      return myReadDir(temp, fileList);
    }

    if(path.basename(file) === 'index.js'){
      var obj = require(path.join(dir, file));
      fileList.push(obj);
    }

  });

  return fileList;

};

const db = function(){

	var host = process.env.DB_HOST || 'localhost';
	var port = process.env.DB_PORT || 27017;
	var user = process.env.DB_USER || '';
	var pass = process.env.DB_PASS || '';
	var name = 'me_boaviagem_api_' + process.env.NODE_ENV;

	if (user !== '' && pass === '') {
	  return next(new Error("If DB user (" + user + ") is not empty, DB password can't be empty."));
	}

	if (user === '' && pass !== '') {
	  return next(new Error("If DB password (" + pass + ") is not empty, DB user can't be empty."));
	}

	var mongoUrl = 'mongodb://';
	if(user !== '') mongoUrl += user + ':' + pass + '@';

	mongoUrl += host + ':' + port + '/' + name;

	var conn = Mongoose.createConnection(mongoUrl);
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

const log = async function(){
	const options = {
		ops: {
		  interval: 1000
		},
		reporters: {
			myConsoleReporter: [
				{
		      module: 'good-squeeze',
		      name: 'Squeeze',
		      args: [{ log: '*', response: '*', request: '*'  }]
				},
				{
				  module: 'good-console'
				},
				'stdout'
			]
		}
	};

	await server.register({
	  plugin: require('good'),
	  options,
	});
};

const i18n = async function(){
	/*
	 * Language plugin. 
	 *
	 * Default locale: pt-BR.
	 *
	 * If you want another locale, put the header:
	 *
	 * headers:{
	 *    Content-Type: 'application/json',
	 *    ...
	 *    lang: 'en'
	 * }
	 * 
	 */
	await server.register({
		plugin: require('hapi-i18n'),
		options: {
			locales: [ 'pt-BR' ],
			directory: __dirname + '/locales',
			languageHeaderField: 'lang'
		}
	});
}

exports.init = async function(){

		// language
    await i18n();

		// logging
    await log();

		// connect to database
    db();
		
		// auth plugin
		await server.register(require('bell'));
    if(process.env.NODE_ENV!=='production')
      await server.register(require('@hapi/basic'));

    // JWT plugin
    await server.register(require('hapi-auth-jwt2'));

    // load my modules
    var moduleList = myReadDir(path.join(__dirname, 'modules'));
    await server.register(moduleList);

    // blipp plugin
    if(process.env.NODE_ENV === 'development') await server.register({ plugin: require('blipp') });

    // documentation
    await server.register([ require('vision'), require('inert'), require('lout') ]);

    await server.initialize(); // finishes plugin registration

    return server;

};

exports.start = async () => {
  await server.start();
  debug('Server running ('+ process.env.NODE_ENV +') at: ', server.info.uri);
}

process.on('unhandledRejection', (err) => {
  debug(err);
  process.exit(1);
});
