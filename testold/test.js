'use strict';


experiment('API tests', () => {

  let server;

  before(async () =>{
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  require('./root/root.test.js')(server, experiment, test, expect);

});

