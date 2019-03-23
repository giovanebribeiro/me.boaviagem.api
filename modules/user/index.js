exports.plugin = {
	name: 'user',
	description: 'The user and auth module',
	register: function(server, options){
		// load auth strategies
		require('./auth.strategy.github.js')(server);

		server.method('tokengen', require('./method.tokengen.js')(server));

		server.route(require('./route.token.github.js'));

	}

};
