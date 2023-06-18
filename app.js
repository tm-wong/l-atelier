'use strict';

const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');


// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function(fastify, opts) {
    // Place here your custom code!

    // CORS
    await fastify.register(cors, { 
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    });

    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404);
        return 'Not Found\n';
    });
};
