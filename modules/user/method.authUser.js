'use strict';

const User = require('./model.user.js');
const debug = require('debug')('me.boaviagem.api:method.authUser.js');

module.exports = function(server){
  return (
    async function authUser(request, provider){
      if(!provider){
        provider = 'none';
      }

      if(!request.auth.isAuthenticated){
        server.log('Authentication failed due to message: ${request.auth.error.message}');
        return callback(new Error(request.i18n.__('user.auth.failed')));
      }
      
      var credentials = request.auth.credentials;

      var providerUserId = null;
      let userNew = new User();
      switch(provider){
        case 'github':
          providerUserId = credentials.profile.id;
          userNew.name = credentials.profile.displayName;
          userNew.email = credentials.profile.email;
          break;
        case 'google':
          providerUserId = credentials.profile.id;
          userNew.name = credentials.profile.displayName;
          userNew.email = credentials.profile.email;
          break;

        default: break;
      }

      let user = await User.findOne({ 
        auth: { 
          '$elemMatch': { provider: provider, id: providerUserId } 
        } 
      });

      let code = 200;

      if(!user){
        debug('user not found. Create it');

        user = userNew;
        user.auth = [];
        user.auth.push({
          provider: provider,
          id: providerUserId,
          email: userNew.email,
          raw: credentials
        });

        await user.save();
        code = 201;

      }

      return [code, user];

    }

  );

};
