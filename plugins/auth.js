'use strict';

const fs = require('fs');
const util = require('util');
const jwt = require('jsonwebtoken');
const fp = require('fastify-plugin');


// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {

    fastify.decorate('auth', async(request /* , reply */) => {
        // Set up
        const { log, httpErrors } = fastify;
        const verify = util.promisify(jwt.verify);

        try {

            // Extract authorization header
            const { authorization } = request.headers;
            if (!authorization) {
                throw httpErrors.unauthorized();
            }

            // Extract token
            const token = authorization.replace(/Bearer\s{1}/, '');
            if (!token) {
                throw httpErrors.unauthorized();
            }

            // Check token format
            if (!/^[\w|.|-]{768}$/.test(token)) {
                throw httpErrors.badRequest();
            }

            // Get certificate
            const cert = fs.readFileSync(process.env.CERTIFICATE);

            // Verify token
            const decoded = await verify(token, cert);
            if (!decoded) {
                throw httpErrors.forbidden();
            }

            return true;

        } catch(err) {
            // log before realying error
            log.error(err);
            throw err;
        }
    });
});
