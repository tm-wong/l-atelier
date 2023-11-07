/**
 * root.ts
 */

import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyPluginAsync
} from 'fastify';


const RootRoutes: FastifyPluginAsync = async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    opts: FastifyPluginOptions
) => {

    /* eslint-disable no-console */
    console.log('=== environment in fastify', 'environment' in fastify);
    console.log('=== fastify.environment()', fastify.environment());
    /* eslint-enable no-console */

    fastify.get('/', {}, (request, reply) => {
        try {
            return reply.status(200).send({ message: 'Ok' });
        } catch(err) {
            request.log.error(err);
            return reply.status(500);
        }
    });
};

export default RootRoutes;
