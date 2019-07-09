'use strict';

const boom = require('boom');
const errorTag = ['me.boaviagem.api', 'user', 'route.token.local.js'];

module.exports = {
  method: ['POST'],
  path: '/token/local',
  options: {
    auth: 'local',
    description: 'Get an user token using local auth provider',
    handler: async function localToken(request, h){
      try{
        const result = await request.server.methods.tokengen(request, 'local');
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
