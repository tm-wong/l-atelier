/**
 * Environment.ts
 */

import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default fp(async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    options: FastifyPluginOptions
) => {
    fastify.decorate('environment', () => {
        const env: string = process.env.NODE_ENV || 'production';
        return env;
    });
});
