'use strict';

const debugTag = ['debug', 'me.boaviagem.api', 'user', 'route.token.local.js'];

exports.plugin = {
	name: 'user',
	description: 'The user and auth module',
	register: function(server, options){

    // load events
    // onPreAuth
    //server.ext(require('./ext.authApp.js'));
		
    // load auth strategies
		//require('./auth.strategy.github.js')(server);
		//require('./auth.strategy.google.js')(server);

    // module exposed methods
    server.method('userAuth', require('./method.authUser.js')(server)); // only visible if called with server.plugins['user']
		server.method('userTokengen', require('./method.tokengen.js')(server));

    // routes
    // GET /token/github
		//server.route(require('./route.token.github.js'));
    // GET /token/google
		//server.route(require('./route.token.google.js'));

	}

};
