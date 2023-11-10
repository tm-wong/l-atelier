/**
 * Environment.ts
 */

// fastify-plugin is highly
// recommended for any plugin you write
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

// import Log from '../Logger';

export default fp(async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    options: FastifyPluginOptions
) => {
    fastify.decorate('environment', () => {
        const env: string = process.env.NODE_ENV || 'production';
        // eslint-disable-next-line no-console
        console.log('=== env', env);
        return env;
    });
});
