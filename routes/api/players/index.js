'use strict';


/**
 * Routes de l'API Players
 */
// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    // Décalaration des utilitaires courants
    const { log, httpErrors } = fastify;

    // Route 
    fastify.get('/', async function(request, reply) {
        try {
            const authorized = await fastify.auth(request, reply);
            if (!authorized) {
                throw httpErrors.unauthorized();
            }
            return { players: 'OK' };
        } catch (err) {
            log.error(err);
            throw err;
        }
    });
};
