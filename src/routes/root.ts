/**
 * root.ts
 */

import { FastifyPluginAsync } from 'fastify';

const rootRoutes: FastifyPluginAsync = async(
    fastify,
    // eslint-disable-next-line no-unused-vars
    opts
) => {

    const { httpErrors } = fastify;

    // eslint-disable-next-line no-unused-vars
    fastify.get('/', {}, (request, reply) => {

        const content = `
********************************************************************************

    Tennis Players - REST API

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55

    Tennis Players REST API to TypeScript 

    November 2023

********************************************************************************
`;
        reply.type('text/plain');
        return content;
    });

    // eslint-disable-next-line no-unused-vars
    fastify.get('/api', async(request, reply) => {
        throw httpErrors.forbidden();
    });

    /**
     * Service de fichiers statiques
     * de façon à rendre la documentation accessible
     */
    fastify.get('/doc', async function(request, reply) {

        // set up du MIME type
        reply.type('text/html');

        // output du fichier statique
        return reply.sendFile('index.html');
    });
};

export default rootRoutes;
