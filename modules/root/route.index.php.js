'use strict';

module.exports = {
  method: 'GET',
  path: '/index.php',
  options: {
    description: 'In the beginning...',
    handler: async function(request, h){

      return h.redirect('https://youtu.be/TzXXHVhGXTQ').permanent();
      
    }

  }

};
