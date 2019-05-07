'use strict';

const boom = require('boom');
const errorTag = ['me.boaviagem.api', 'user', 'route.token.google.js'];

module.exports = {
	method: ['GET'],
	path: '/token/google',
	options: {
		auth: 'google',
		description: 'Get an user token using google (https://google.com) provider',
		handler: async function googleToken(request, h){

      try{
        await request.server.methods.tokengen(request, 'google');
				return 'user logged!';
      }catch(err){
        request.server.log(errorTag, err.message);
        return boom.internal(err.message, err);
      }

		}

	}

};
