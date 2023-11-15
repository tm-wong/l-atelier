/**
 * Environment.ts
 */

import fp from 'fastify-plugin';

/**
 * this plugin returns environment ( dev | preprod | prod )
 */
export default fp(async(
    fastify,
    // eslint-disable-next-line no-unused-vars
    opts
) => {
    fastify.decorate('environment', () => {
        return process.env.NODE_ENV || 'production';
    });
});
