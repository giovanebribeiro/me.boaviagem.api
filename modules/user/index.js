exports.plugin = {
	name: 'user',
	description: 'The user and auth module',
	register: function(server, options){
		// load auth strategies
		require('./auth.strategy.github.js')(server);
		require('./auth.strategy.google.js')(server);

    // module exposed methods
    server.expose('authUser', require('./method.authUser.js')(server)); // only visible if called with server.plugins['user']
		server.method('tokengen', require('./method.tokengen.js')(server));

    // routes
		server.route(require('./route.token.github.js'));
		server.route(require('./route.token.google.js'));

	}

};
