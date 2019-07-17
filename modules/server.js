'use strict';

const Hapi = require('hapi');
const debug = require('debug')('me.boaviagem.api:server.js');
const fs = require('fs');
const path = require('path');

const db = require('./db.js');
const myReadDir = require('./myReadDir.js');

require('dotenv').config();

// track of server state
let internals = {
  initialized: false
};

const server = Hapi.server({
  host: 'localhost',
  port: 8051
});

// source: https://gist.github.com/kethinov/6658166

exports.init = async () =>{
  db(server);
  
  /*
   * LOG
   */
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
	  options
	});

  if(process.env.NODE_ENV !== 'test'){
    /*
     * Language plugin. 
     *
     * Default locale: pt-BR.
     *
     * If you want another locale, put inside the header:
     *
     * headers:{
     *    Content-Type: 'application/json',
     *    ...
     *    lang: 'en' (another options, see: 
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
	
  await server.register(require('bell'));
  if(process.env.NODE_ENV!=='production')
    await server.register(require('@hapi/basic'));

  // JWT plugin
  await server.register(require('hapi-auth-jwt2'));

  // load my modules
  var moduleList = myReadDir(__dirname/*path.join(__dirname, 'modules')*/);
  await server.register(moduleList);

  // blipp plugin
  if(process.env.NODE_ENV === 'development') await server.register({ plugin: require('blipp') });

  // documentation
  await server.register([ require('vision'), require('@hapi/inert'), require('lout') ]);

  await server.initialize(); // finishes plugin registration

  internals.initialize = true;
  server.events.emit('app-initialized');

  return server;

};

exports.start = async () => {
  await server.start();
  debug('Server running ('+ process.env.NODE_ENV +') at: ', server.info.uri);
};

exports.closeDb = async () => {
  await Mongoose.connection.close();
  server.log('Database Disconnected successfully.');
  debug('Database disconnected.');
};

process.on('unhandledRejection', (err) => {
  debug(err);
  process.exit(1);
});
