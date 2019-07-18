'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, beforeEach, afterEach, it } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

describe('Api tests', () => {
  describe('root service', () => {
    let server;

    beforeEach(async () => {
      server = await init();
    });

    afterEach(async () => {
      await server.stop();
    });

    it('The root url should return "Hello World!"', async () => {
      const res = await server.inject({
        method: 'get',
        url: '/'
      });

      expect(res.statusCode, 200);
      expect(res.result, 'Hello World!');
    });

  });

});
