'use strict';

const Hapi = require('@hapi/hapi');
const debug = require('debug')('me.boaviagem.api:modules/server.js');

const { db, closeDb } = require('./db.js');
const log = require('./log.js');
const myReadDir = require('./myReadDir.js');
const i18n = require('./i18n.js');
const { swagger } = require('./swagger.js');

require('dotenv').config();

const server = Hapi.server({
  host: '0.0.0.0',
  port: 8051
});

// source: https://gist.github.com/kethinov/6658166

exports.init = async () =>{
  db(server);

  await i18n(server);
  
  if(process.env.NODE_ENV !== 'test')
    await log(server);
	
  await server.register([
    require('@hapi/bell'), // logins with many providers require('hapi-auth-jwt2') // json web token
  ], { once: true });

  // load my modules
  var moduleList = myReadDir(__dirname/*path.join(__dirname, 'modules')*/);
  await server.register(moduleList, {once: true});

  // blipp plugin
  await server.register({ plugin: require('blipp') }, { once: true });

  // documentation
  if(process.env.NODE_ENV !== 'test')
    await swagger(server);

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
