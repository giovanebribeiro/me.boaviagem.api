'use strict';
/*
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

describe('Api tests', () => {

  describe('authenticate services and methods', () => {
    let server;
    let request;

    beforeEach(async () => {
      server = await init();
    });

    afterEach(async () => {
      await server.stop();
    });

    it('github auth', async () => {
      request = {
        auth: {
          credentials: {
            "provider": "github",
            "query": {},
            "token": "jcjbasdcbasdbcjasbdc9q874r8q34ryqhweuq47yr",
            "profile": {
              "id": 999999,
              "username": "giovanebribeiro",
              "displayName": "Giovane Boaviagem Ribeiro",
              "email": "giovanebribeiro@gmail.com",
              "raw": {
                "login": "giovanebribeiro",
                "id": 99999999,
                "created_at": "2012-02-28T00:19:24Z",
                "updated_at": "2019-07-11T23:00:13Z"
              }
            }
          }
        }
      };

      let loggedUser = await server.plugins['user'].authUser(request, 'github');
      expect(loggedUser).exists();

    });
  });

});
*/
