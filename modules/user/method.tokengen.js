'use strict';

module.exports = function(server){

	return (
		function tokengen(request, provider, isCritic, callback){

      // 'provider' is an optional parameter
      if(typeof(provider) === 'function'){
        callback = provider;
        provider = 'none';
      }

      if(typeof(isCritic) === 'function'){
        callback = isCritic;
        isCritic = false;
      }
      
      if(!request.auth.isAuthenticated){
        server.log('Authentication failed due to message: ${request.auth.error.message}');
        return callback(new Error(request.i18n.__('user.auth.failed')));
      }

      // generate the JWT with user data
      // if user not found, create it with the provider data

			return callback(null);

		}

	);

};
