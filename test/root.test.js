'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

describe('GET /', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('Hello World!', () => {
    const res = server.inject({
      method: 'get',
      url: '/'
    });

    expect(res.statusCode, 200);
  });
});
