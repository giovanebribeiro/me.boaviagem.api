'use strict';

const Bcrypt = require('bcryptjs');
const User = require('./model.user.js');

const validate = async (request, username, password, h) => {

  const user = await User.findOne({ email: username });
  if(!user){
    return { credentials: null, isValid: false };
  }

  let localProvider = {};
  user.auth.forEach(function(value, index){
    if(value.provider === 'local'){
      localProvider = value;
      return;
    }
  });

  // user found, but with not credentials
  if(localProvider === {}){
    return { credentials: null, isValid: false };
  }

  // wrong password
  const isValid = await Bcrypt.compare(password, localProvider.raw.password);
  if(!isValid)
    return { credentials: null, isValid: isValid };

  return {
    credentials: {
      id: user._id,
      email: user.email,
      name: user.name
    },
    isValid: true
  };
}

module.exports = function(server){
  server.auth.strategy('local', 'basic', { validate })
}
