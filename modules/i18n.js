'use strict';

module.exports = async(server) => {

    /*
     * Language plugin. 
     *
     * Default locale: pt-BR.
     *
     * If you want another locale, put inside the header:
     *
     * headers:{
     *    Content-Type: 'application/json',
     *    ...
     *    lang: 'en' (another options, see: 
     * }
     * 
     */
    await server.register({
      plugin: require('hapi-i18n'),
      options: {
        locales: [ 'pt-BR' ],
        directory: process.cwd() + '/locales',
        languageHeaderField: 'lang',
        defaultLocale: 'pt-BR'
      }
    }, { once: true });
};
