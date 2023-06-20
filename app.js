'use strict';

const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
const auth = require('./plugins/auth');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function(fastify, opts) {


    // Place here your custom code!



    // Init du logger
    const { log } = fastify;

    // Chargement du middleware plugin
    await fastify.register(require('@fastify/middie'))
    
    // CORS
    await fastify.register(cors, {
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
    });

    // Service de fichiers statiques 
    // de façon à rendre la documentation accessible
    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'apidoc')
    });




    // Autoload par défaut de fastify

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




    // Gestion des erreurs dans la réponse HTTP
    fastify.setErrorHandler((err, request, reply) => {

        const env = process.env.NODE_ENV;
        const statusCode = err.statusCode || 500;

        // si l'environnement est autre que celui de développement
        // et que l'erreur est de type 500,
        // le message d'erreur est opacifié => InternalServerError
        // de façon à ne pas laisser transparaître
        // une éventuelle faille de sécurité 
        const message = env !== 'dev' &&
            statusCode === 500 && 
            'Internal Server Error' ||
            err.message;

        // output de l'erreur
        return reply.status(statusCode).send({ statusCode, message });
    });



};
