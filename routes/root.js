'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {
    fastify.get('/', async function(/* request, reply */) {
        return { root: true };
    });
};
