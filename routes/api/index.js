'use strict';

/**
 * Routes /api/(.)*
 */
// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    // Décalaration des utilitaires courants
    const { log, httpErrors } = fastify;

    // Route
    fastify.get('/:(^[\\w-.]+)', async function(request, reply) {

        try {
        	throw httpErrors.forbidden();
        } catch (err) {
            log.error(err);
            throw err;
        }
    });
};
