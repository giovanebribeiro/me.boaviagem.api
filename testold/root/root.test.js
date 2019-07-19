'use strict';

module.exports = (server, experiment, test, expect) => {
  let testServer = server;
  
  experiment('root service', () => {

    require('./root.route.test.js')(testServer, test);
    
  });

};

