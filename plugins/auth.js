'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const jwt = require('jsonwebtoken');
const fp = require('fastify-plugin');


/**
 * Ce plugin permet d'authentifier le token
 * passé dans le header `Authorization`
 */
// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {

    fastify.decorate('auth', async(request /* , reply */) => {

        // Set up
        const { log, httpErrors } = fastify;
        const verify = util.promisify(jwt.verify);

        try {

            // Extraction du header authorization
            const { authorization } = request.headers;
            if (!authorization) {
                throw httpErrors.unauthorized();
            }

            // Extraction du token
            const token = authorization.replace(/Bearer\s{1}/, '');

            // Vérification du format du token
            if (!/^[\w.-]{768}$/.test(token)) {
                throw httpErrors.badRequest();
            }

            // Récupérer le certificat

            const cert = fs.readFileSync(path.join(__dirname, '../', process.env.CERTIFICATE));

            // Retourner le token vérifié
            return await verify(token, cert);

        } catch(err) {

            // log avant de relayer l'erreur
            log.error(err);

            // Erreur spécifique de la vérification du token
            if (err.message === 'invalid token') {
                throw httpErrors.forbidden();
            }

            // Toute autre erreur
            throw err;

        }
    });
});
