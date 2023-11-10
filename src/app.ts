/**
 * app.ts
 */

import path from 'path';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';

import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify';


export default async(fastify: FastifyInstance, opts: FastifyPluginOptions) => {

    // Place here your custom code!

    // CORS
    await fastify.register(cors, {
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
    });


    // Autoload par défaut de fastify


    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(autoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(autoLoad, {
        dir: path.join(__dirname, 'routes'),
        // maxDepth: 5,
        options: Object.assign({}, opts)
    });


    // Gestion des erreurs dans la réponse HTTP
    fastify.setErrorHandler((err, request, reply) => {

        const statusCode = err.statusCode || 500;
        const env = fastify.environment();

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
