'use strict';

const fp = require('fastify-plugin');


// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {

    fastify.decorate('errHandler', async(err, reply) => {

        const { log } = fastify;

        try {

            switch (err.message) {
                    case 'Unauthorized':
                        return reply.unauthorized();
                    case 'Bad Request':
                        return reply.badRequest();
                    case 'Forbidden':
                        return reply.forbidden();
                    case 'Not Found':
                        return reply.notFound();
                    case 'Method Not Allowed':
                        return reply.methodNotAllowed();
                    case 'Request Timeout':
                        return reply.requestTimeout();
                    default:
                        return reply.internalServerError();
            }

        } catch (err) {
            log.error(err);
            throw err;
        }
    });
});
