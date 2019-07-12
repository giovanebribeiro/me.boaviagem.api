exports.plugin = {
  name: 'root',
  version: '0.0.0',
  description: 'The root module',
  register: function(server, options){

    server.route({
      method: 'GET',
      path: '/',
      options: {
        description: 'In the beginning...',
        handler: function(request, h){
          if(process.env.NODE_ENV === 'test'){
            return 'Hello World!';
          } else {
            return h.redirect('/docs').permanent();
          }
        }
      }
    });

  }
};
