/**
 * auth.ts
 */

import fs from 'fs';
import path from 'path';
import util from 'util';
import fp from 'fastify-plugin';
import jwt, { Secret, SigningKeyCallback, GetPublicKeyOrSecret } from 'jsonwebtoken';

import {
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from 'fastify';

import getLogger from '../../common/log';
import { _E_ } from '../../common/errors';

// log instance
const log = getLogger('AUTH');


/**
 * @function tokenVerify
 *
 * This is a token decoding / check
 * function. It is written in a separate
 * function wrapper and out from the main
 * code thread in order to deal with
 * possible check errors separately
 * - throws a Bad Request Error in case
 * of failure
 *
 * This makes error types testing unnecessary
 * in the main code thread and clears clutter
 * away from it, making code easier to read
 *
 */
type VerifyFn = {
    (
        // eslint-disable-next-line no-unused-vars
        token: string, cert: Secret | GetPublicKeyOrSecret
    ): Promise<SigningKeyCallback>;
};

const tokenVerify = async(
    token: string,
    cert: Secret | GetPublicKeyOrSecret,
    // eslint-disable-next-line no-unused-vars
    fastify: FastifyInstance
) => {

    const verify: VerifyFn = util.promisify(jwt.verify);

    try {
        return await verify(token, cert);
    } catch(err) {
        log.error(err);
        throw new _E_.BAD_REQUEST();
    }
};


/**
 * This is an authenticating plugin
 * that makes sure token passed in
 * `Authorization` header is valid
 */
// eslint-disable-next-line no-unused-vars
export default fp(async function(fastify, opts) {

    // eslint-disable-next-line no-unused-vars
    fastify.decorate('auth', async(request: FastifyRequest, reply: FastifyReply) => {

        // Authorization header extraction
        const { headers: { authorization } } = request;

        if (!authorization) {
            throw new _E_.UNAUTHORIZED();
        }

        // token extraction
        const token = authorization.replace(/Bearer\s{1}/, '');

        // token check
        if (!/^[\w.-]{768}$/.test(token)) {
            throw new _E_.BAD_REQUEST();
        }

        // get certificate
        const cert = fs.readFileSync(
            path.join(__dirname, '../../', '' + process.env.CERTIFICATE)
        );

        // return verified tokern
        return await tokenVerify(token, cert, fastify);

    });
});
