'use strict';

const pkg = require('../../package.json');
const debug = require('debug')(pkg.name + ':' + 'event.authApp.js');
const Boom = require('@hapi/boom');

const User = require('../user/model.user.js');

module.exports = {
  type: 'onPreAuth',
  method: async function authApp(request, h){

    const headers = request.headers;
    debug(`request headers = ${JSON.stringify(headers, '\t', 1)}`);

    if(!headers['x-client-id']){
      const message = request.i18n.__('request.missing.header');
      return Boom.badRequest(message + 'x-client-id');
    }

    const client = await User.find({ 'apps.clientId': request.headers['x-client-id'] },
      { apps: 1 });
    debug(`client to process = ${JSON.stringify(client, '\t', 1)}`);
    
    if(!client || client.length == 0)
      return Boom.badRequest(request.i18n.__('user.auth.client-not-found'));







    //TODO find app
    // if not found, throw error

    return h.continue;

  }

};

