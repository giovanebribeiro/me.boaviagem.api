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
        const result = await request.server.methods.tokengen(request, 'github');
        let returnCode = result[0];
        let responseData = result[1];
        return h.response(responseData).code(returnCode);
      }catch(err){
        request.server.log(errorTag, err.message);
        throw boom.internal(err.message, err);
      }

    }

	}

};
