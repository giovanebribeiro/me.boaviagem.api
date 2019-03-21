exports.plugin = {
	name: 'user',
	description: 'The user and auth module',
	register: function(server, options){

		server.method('tokengen', require('./tokengen.method.js')(server));

		server.route(require('./token.github.route.js'));

	}

};
