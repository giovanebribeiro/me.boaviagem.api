'use strict';

const Lab = require('@hapi/lab');
const { expect, thrownAt } = require('@hapi/code');
const { after, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../modules/server.js');

describe('User service', () => {
  let server;

  before(async () => {
    server = await init();
    server.route({
      method: 'GET',
      path: '/test/{provider?}',
      handler: async (request/*, h*/) => {
        request.auth.isAuthenticated = request.payload.isAuthenticated || true;
        request.auth.credentials = request.payload.credentials || false;
        return await server.plugins['user'].authUser(request, request.params.provider);
      }
    });
  });

  after(async () => {
    await server.stop();
  });

  it('authUser method => none provider', async () => {

    const res = await server.inject({
      method: 'get',
      url: '/test/none',
      payload: {
        isAuthenticated: true,
        credentials: {
          "provider": "none",
        }
      }
    });
    
    expect(res.result).to.exists();
    thrownAt(res.result); // error for unknown provider
  });
  
  it('authUser method => github provider');
  
  it('authUser method => google provider');
 
  /*
  it('github auth', async () => {
    request = {
      auth: {
        isAuthenticated: true,
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
  */
});


/*

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

    
  });

});
*/
