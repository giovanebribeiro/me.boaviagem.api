'use strict';

const User = require('./model.user.js');

module.exports = function(server){

  const validateJWT = async function(decoded, request){

    try{
      let user = await User.findById(decoded.id);
      let ret = (user)? true: false;
      return ret;
    } catch(err){
      server.log(errorTag, err);
    }

  };

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.AUTH_JWT_PRIVATE_KEY,
    validate: validateJWT,
    verifyOptions: { algorithms: [ 'HS512' ] }
  });

  server.auth.default('jwt');

};
