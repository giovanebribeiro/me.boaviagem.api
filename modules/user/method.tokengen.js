'use strict';

const debug = require('debug')('me.boaviagem.api:method.tokengen.js');
const JWT = require('jsonwebtoken');

module.exports = function(server){

	return (
		async function tokengen(request, provider){

      let loggedUser = await server.plugins['user'].authUser(request, provider);

      let authBy = [];
      loggedUser[1].auth.forEach(function(item){
        authBy.push(item.provider);
      });

      const iat = Date.now();
      const iss = 'https://api.boaviagem.me';
      const exp = 300; // 5 min
      const payload = {
        id: loggedUser._id,
        name: loggedUser.name,
        authProviders: authBy,
        /* JWT claims (source: https://tools.ietf.org/html/rfc7519#page-9) */
        exp: exp, // expires in
        iss: iss, // identifies who issued the JWT.
        iat: iat // JWT issued at...
      };
      const token = await JWT.sign(payload, process.env.AUTH_JWT_PRIVATE_KEY, { algorithm: 'HS512' });

      debug('generated token = ', token);
      return [
        loggedUser[0], // code
        {
          token: token,
          expiresIn: exp,
          issuedAt: iat,
          issuer: iss
        }
      ];

		}
	);

};
