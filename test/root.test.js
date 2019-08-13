'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, it, beforeEach, afterEach } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

describe('Root service', () => {

  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('main route should return *Hello World!*', async () =>{

    const res = await server.inject({
      method: 'get',
      url: '/'
    });

    expect(res.statusCode, 200);
    expect(res.result, 'Hello World!');
  });
});

