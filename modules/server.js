'use strict';

const Hapi = require('hapi');
const debug = require('debug')('me.boaviagem.api:modules/server.js');

const { db, closeDb } = require('./db.js');
const log = require('./log.js');
const myReadDir = require('./myReadDir.js');
const i18n = require('./i18n.js');

require('dotenv').config();

const server = Hapi.server({
  host: 'localhost',
  port: 8051
});

// source: https://gist.github.com/kethinov/6658166

exports.init = async () =>{
  db(server);

  await i18n(server);
  
  if(process.env.NODE_ENV !== 'test')
    await log(server);
	
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

  server.events.on('stop', async () => {
    await closeDb(server);
  });

  await server.initialize(); // finishes plugin registration

  return server;

};

exports.start = async () => {
  await server.start();
  debug('Server running ('+ process.env.NODE_ENV +') at: ', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  debug(err);
  process.exit(1);
});
