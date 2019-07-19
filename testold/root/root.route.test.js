'use strict';

module.exports = (server, test) => {
  
  test('The root url should return "Hello World!"', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/'
    });

    expect(res.statusCode, 200);
    expect(res.result, 'Hello World!');
  });

};
