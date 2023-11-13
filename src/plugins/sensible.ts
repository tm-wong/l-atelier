/**
 * sensible.ts
 */

// dependencies
import fp from 'fastify-plugin';
import { fastifySensible as sensible } from '@fastify/sensible';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
// eslint-disable-next-line no-unused-vars
export default fp(async(fastify, opts) => {
    await fastify.register(sensible);
});
