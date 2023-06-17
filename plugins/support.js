'use strict';

const fp = require('fastify-plugin');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {
    fastify.decorate('someSupport', function() {
        return 'hugs';
    });
});
