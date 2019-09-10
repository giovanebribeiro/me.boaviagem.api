'use strict';

const pkg = require('../../package.json');
const debug = require('debug')(pkg.name + ':root/index.js');

exports.plugin = {
  name: 'root',
  version: '0.0.0',
  description: 'The root module',
  register: function(server, options){

    // GET /index.php
    server.route(require('./route.index.php.js'));

    server.route({
      method: 'GET',
      path: '/',
      options: {
        description: 'In the beginning...',
        handler: async function(request, h){
          let routes = server.plugins.blipp.info()[0].routes;
          debug('routes = ', routes);

          let resp = {};
          for (let i = 0; i < routes.length; i++){
            const item = routes[i];
            debug(`${JSON.stringify(item, '\t', 1)}`);
            if(item.description !== '')
              resp[ item.path ] = item.description;
          }

          return JSON.stringify(resp, '\t', 1);
        }

      }

    });

  }
};
