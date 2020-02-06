'use strict';

module.exports = async (server) => {

    const options = {
        prettyPrint: process.env.NODE_ENV !== 'production',
        // obfuscate sensible information
        // see https://getpino.io/#/docs/redaction
        redact: [
            'req.headers.authorization'
        ]
    };

    // TODO falta configurar as demais opções, como stream, etc.

    await server.register({
        plugin: require('hapi-pino'),
        options: options
    });
  
};
