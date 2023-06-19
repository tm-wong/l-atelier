'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    fastify.get('/', async function(request, reply) {

        reply.type('text/plain');
        const content = `
********************************************************************************

    Tennis Players API - REST

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55 / L'atelier

********************************************************************************
`;
        return content;

    });
};
