/**
 * logger.ts
 */

import fp from 'fastify-plugin';
import getLogger from '../../common/log';

export default fp(
    async(
        fastify,
        // eslint-disable-next-line no-unused-vars
        options
    ) => {
        fastify.decorate(
            'appLog',
            (logIdentifier: string) => getLogger(logIdentifier)
        );
    }
);
