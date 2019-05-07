'use strict';

module.exports = function(server){
  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: process.env.AUTH_COOKIE_PASSWORD,
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    isSecure: process.env.NODE_ENV === 'production',
    scope: ['profile', 'email']
  })
}
