/**
 * logger.ts
 */

import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import getLogger from '../../common/log'

export default fp(
    async(
        fastify: FastifyInstance,
        // eslint-disable-next-line no-unused-vars
        options: FastifyPluginOptions
    ) => {
        fastify.decorate(
            'appLog',
            (logIdentifier: string) => getLogger(logIdentifier)
        );
    }
);
