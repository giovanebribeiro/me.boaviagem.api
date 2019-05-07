'use strict';

const debug = require('debug')('me.boaviagem.api:method.tokengen.js');

module.exports = function(server){

	return (
		async function tokengen(request, provider){

      let loggedUser = await server.plugins['user'].authUser(request, provider);
      debug('loggedUser = ', loggedUser);
      
		}

	);

};
