'use strict';
const axios = require('axios')
const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


server.route({
    method: 'GET',
    path: '/swapi',
    handler: async(request, h) => {


      // makes get request to nasa websitr , get the html reponse and retutn in


      let response = await axios.get('https://swapi.co/api/people/2')

      console.log(response.data)
        return response.data
    }
});



const init = async () => {

  await server.register(require('inert'))

  server.route({
      method:  'GET',
      path:    '/',
      handler: (request, h) => {

        return h.file('./public/home.html');
    }
  })

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
