'use strict';

const boom = require('boom');

module.exports = {
	method: ['GET'],
	path: '/token',
	options: {
		description: 'token provider callback',
		handler: function githubToken(request, h){

			request.log('debug', request.auth);

			if(!request.auth.isAuthenticated){
				return boom.unauthorized('Authentication failed due to message: ${request.auth.error.message}', 'github');
			}

			return JSON.stringify(request.auth.credentials, null, 4);

		}

	}

};
