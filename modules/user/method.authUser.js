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
      
      const credentials = request.auth.credentials;

      let providerUserId = null;
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
      
      let code = 200;

      // first try: by provider
      let user = await User.findOne({ 
        auth: { 
          '$elemMatch': { provider: provider, id: providerUserId } 
        } 
      });

      // second try: by e-mail
      user = await User.findOne({
        email: userNew.email
      });

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

        code = 201;

      } else {
        
        // user found, but with a different provider (with same e-mail).
        // add new provider
        user.auth.push({
          provider: provider,
          id: providerUserId,
          email: userNew.email,
          raw: credentials
        });
      
      }

      await user.save();
      return [code, user];

    }

  );

};
