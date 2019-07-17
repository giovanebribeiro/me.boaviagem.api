`use strict`;

const { db, init, start } = require('./modules/server.js');

(async () =>{
  await init();
  await start();
})();

