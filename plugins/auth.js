'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const jwt = require('jsonwebtoken');
const fp = require('fastify-plugin');


/**
 * Cette fonction permet de décoder le token
 * Elle est détachée du fil principal d'exécution
 * de façon à traiter les erreurs éventuelles
 * et liées à la vérification de façon spécifique
 * (badRequestError) tout en évitant des tests
 * sur le type d'erreur qui encombreraient
 * la lecture du code et de façon à le rendre plus clair 
 */
const tokenVerify = async(token, cert, fastify) => {
    const verify = util.promisify(jwt.verify);
    const { log, httpErrors } = fastify;

    try {
        return await verify(token, cert);
    } catch(err) {
        // badRequestError
        // log avant de relayer l'erreur
        log.error(err);
        throw httpErrors.badRequest(err.message);
    }
};

/**
 * Ce plugin permet d'authentifier le token
 * passé dans le header `Authorization`
 */
// eslint-disable-next-line no-unused-vars
module.exports = fp(async function(fastify, opts) {

    fastify.decorate('auth', async(request /* , reply */) => {

        // Set up
        const { log, httpErrors } = fastify;

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
            return await tokenVerify(token, cert, fastify);

        } catch(err) {
            // log avant de relayer l'erreur
            log.error(err);
            throw err;
        }
    });
});
