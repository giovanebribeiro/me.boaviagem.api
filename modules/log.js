'use strict';

module.exports = async (server) => {

    const options = {
        prettyPrint: process.env.NODE_ENV !== 'production',
        /* Possible values:	trace	debug	info	warn	error	fatal	silent */
        level: process.env.LOG_LEVEL || 'trace',
        // obfuscate sensible information
        // see https://getpino.io/#/docs/redaction
        redact: [
            'req.headers.authorization'
        ]
    };

    if(process.env.SENTRY_DSN && process.env.NODE_ENV === 'production'){
        const { createWriteStream } = require('pino-sentry');
        options.stream = createWriteStream({ dsn: process.env.SENTRY_DSN });
    }

    // TODO falta configurar as demais opções, como stream, etc.

    await server.register({
        plugin: require('hapi-pino'),
        options: options,
    });
  
};
