/**
 * app.ts
 */

import path from 'path';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import { E_STANDARD } from './errors';
import getLogger from './common/log';

// eslint-disable-next-line no-unused-vars
import sensible from '@fastify/sensible';

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


    // set up for main script 'app.ts'
    // for error management in  HTTP responses

    const { httpErrors } = fastify;

    fastify.setErrorHandler((err, request, reply) => {

        // 1 - log errors regardless of error type
        log.error(err);

        // 2 - set HTTP Response status code
        const {
            statusCode = 500,
            message = 'Service Unavailable'
        }: {
            statusCode?: undefined | number;
            message: string;
        } = err;

        reply.status(statusCode);

        // 3 - regardless of environment,
        // 5xx error messages are hidden
        // from HTTP Response and
        // only visible in logs

        // 3.1 - check if error is know error
        if (err instanceof E_STANDARD) {
            const { out = 'Service Unavailable' }: { out: string } = err;
            throw httpErrors.createError(statusCode, out);
        }

        // 3.2 - else status code 500 is sent
        throw httpErrors.serviceUnavailable();
    });
};
