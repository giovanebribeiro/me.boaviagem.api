'use strict';

exports.swagger = async (server) => {
  
  var options = {
    info: {
      title: 'My WebAPI Documentation',
      version: require('../package.json').version
    }
  };

  await server.register([
    require('@hapi/vision'), 
    require('@hapi/inert'), 
    {
      plugin: require('hapi-swagger'),
      options: options
    }
  ], { once: true });

};
