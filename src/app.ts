/**
 * app.ts
 */

import path from 'path';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import fastifyStatic from '@fastify/static';
import { _E_ } from './common/errors';
import getLogger from './common/log';

import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify';


export default async(fastify: FastifyInstance, opts: FastifyPluginOptions) => {


    // Place here your custom code!

    const log = getLogger('MAIN - APP');

    // CORS
    await fastify.register(cors, {
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
    });
 
    log.debug('=== path.join(__dirname, apidoc)', path.join(__dirname, 'apidoc'));

    // Service de fichiers statiques 
    // de façon à rendre la documentation accessible
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'apidoc')
    });


    // Default fastify autoload
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
        options: Object.assign({}, opts)
    });


    fastify.setErrorHandler((err, request, reply) => {

        // 1 - log errors regardless of error type
        log.error(err);

        // 2 - extract error essentials
        const {
            statusCode = 500,
            message = 'Service Unavailable'
        }: {
            statusCode?: undefined | number;
            message: string;
        } = err;

        // 3 - set HTTP Response status code
        reply.status(statusCode);


        // 4 - regardless of environment,
        // 5xx error messages are hidden
        // from HTTP Response and
        // only visible in logs

        // check if error is known error
        if (err instanceof _E_.STANDARD) {
            const { out = 'Service Unavailable' }: { out: string } = err;
            return { statusCode, message: out };
        }

        // 5 - else, send default or
        // system statusCode and message
        return { statusCode, message };

    });
};
