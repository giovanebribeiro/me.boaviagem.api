'use strict';

module.exports = function(server){

	return (
		function tokengen(request, callback){
			
			if(!request.auth.isAuthenticated){
				server.log('Authentication failed due to message: ${request.auth.error.message}');
				return callback(new Error(request.i18n.__('user.auth.failed')));
			}

			return callback(null);

		}

	);

};
