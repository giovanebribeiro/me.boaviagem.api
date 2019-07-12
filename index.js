`use strict`;

const { init, start } = require('./modules/server.js');

(async () =>{
  await init();
  await start();
})();

