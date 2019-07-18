'use strict';

module.exports = async (server) => {
  /*
   * LOG
   */
  const options = {
		ops: {
		  interval: 1000
		},
		reporters: {
			myConsoleReporter: [
				{
		      module: 'good-squeeze',
		      name: 'Squeeze',
		      args: [{ log: '*', response: '*', request: '*'  }]
				},
				{
				  module: 'good-console'
				},
				'stdout'
			]
		}
	};

	await server.register({
	  plugin: require('good'),
	  options
	});

};
