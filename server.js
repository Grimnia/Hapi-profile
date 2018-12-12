'use strict';
const axios = require('axios')
const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
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

server.route({
  method: 'GET',
  path: '/nasa',
  handler: async(request, h) => {


    // makes get request to nasa websitr , get the html reponse and retutn in


    let response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=hGYFl8ADHKqJHtKZN1RoZS7JuDFGTzfgwze1lj1y")

    console.log(response.data)
    return response.data
  }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
