'use strict';


// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    const { log, httpErrors, errHandler } = fastify;

    fastify.get('/', async function(request, reply) {
        try {
            const authorized = await fastify.auth(request, reply);
            if (!authorized) {
                throw httpErrors.unauthorized();
            }
            return { players: 'OK' };
        } catch (err) {
            log.error(err);
            return errHandler(err, reply);
        }
    });
};
