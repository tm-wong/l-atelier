/**
 * app.ts
 */


// dep
import { join } from 'path';
import cors from '@fastify/cors';
import getLogger from './common/log';
import { _E_ } from './common/errors';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';


// types
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}


// Pass --options via CLI arguments
// in command to enable these options.
const options: AppOptions = {};


// app
const app: FastifyPluginAsync<AppOptions> = async(
    fastify,
    opts
): Promise<void> => {


    // Place here your custom code!

    const log = getLogger('MAIN - APP');

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
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts
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

export default app;
export { app, options };
