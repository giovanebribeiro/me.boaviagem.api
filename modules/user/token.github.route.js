'use strict';

const boom = require('boom');

module.exports = {
	method: ['GET'],
	path: '/token/github',
	options: {
		auth: 'github',
		description: 'Get an user token using github (https://github.com) provider',
		handler: function githubToken(request, h){

			return new Promise((resolve, reject) => {

				request.server.methods.tokengen(request, function(err){
					if(err) reject(boom.unauthorized(err, 'github'));

					return resolve(JSON.stringify(request.auth.credentials, null, 4));

				});

			});

		}

	}

};
