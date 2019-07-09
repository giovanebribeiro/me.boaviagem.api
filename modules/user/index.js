exports.plugin = {
	name: 'user',
	description: 'The user and auth module',
	register: function(server, options){
		// load auth strategies
		require('./auth.strategy.github.js')(server);
		require('./auth.strategy.google.js')(server);
    if(process.env.NODE_ENV !== 'production'){
      require('./auth.strategy.local.js')(server);
    }

    // module exposed methods
    server.expose('authUser', require('./method.authUser.js')(server)); // only visible if called with server.plugins['user']
		server.method('tokengen', require('./method.tokengen.js')(server));

    // routes
		server.route(require('./route.token.github.js'));
		server.route(require('./route.token.google.js'));
    if(process.env.NODE_ENV !== 'production'){
      require('./route.token.local.js');
    }

	}

};
