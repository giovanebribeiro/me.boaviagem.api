'use strict';

module.exports = function(server){
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: process.env.AUTH_COOKIE_PASSWORD,
    clientId: process.env.AUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
    isSecure: process.env.NODE_ENV === 'production',
    scope: []
  });
};
