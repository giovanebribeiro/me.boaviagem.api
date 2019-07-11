`use strict`;

require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { start } = require('./modules/server.js');

start();
