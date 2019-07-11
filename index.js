`use strict`;

require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { init, start } = require('./modules/server.js');

(async () =>{
  await init();
  await start();
})();

