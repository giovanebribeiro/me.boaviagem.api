'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, before, experiment, test } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

experiment('GET /', () => {
  let server;

  before(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test('Hello World!', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/'
    });

    expect(res.statusCode, 200);
    expect(res.result, 'Hello World!');
  });
});
