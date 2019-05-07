'use strict';

const boom = require('boom');
const errorTag = ['me.boaviagem.api', 'user', 'route.token.github.js'];

module.exports = {
	method: ['GET'],
	path: '/token/github',
	options: {
		auth: 'github',
		description: 'Get an user token using github (https://github.com) provider',
		handler: async function githubToken(request, h){

      try{
        await request.server.methods.tokengen(request, 'github');
				return 'user logged!';
      }catch(err){
        request.server.log(errorTag, err.message);
        return boom.internal(err.message, err);
      }

		}

	}

};
