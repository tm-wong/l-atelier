'use strict';


const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    /**
     * 
     */
    fastify.get('/', async function(request, reply) {

        const content = `
********************************************************************************

    Tennis Players - REST API

    T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 55

    Evaluation technique pour L'Atelier
    
    Juin 2023

********************************************************************************
`;
        reply.type('text/plain');
        return content;

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
