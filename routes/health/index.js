'use strict';

const assert = require('assert');

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


/**
 * Cette route permet de vérifier
 * que les fonctionnalités
 * de base de l'API sont up
 */
// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    const { log, httpErrors } = fastify;

    fastify.get('/', async function(request, reply) {
   
        try {
            // Récupération d'un client depuis le pool
            // de connexions à la base de données
            const client = await pool.connect();

            // Requête
            const result = await client.query('SELECT * FROM test_table');

            // Formattage des résultats
            const content = (result) ? result.rows : null;

            // Remise à disposition du client pour d'autres
            // connexions à la base de données
            client.release();

            // Vérification des résulatats
            assert.strictEqual(content[0]?.name, 'hello database');

            // Confirmation du statut 
            return { status: 'OK' };

        } catch (err) {
            // Traitement des erreurs
            log.error(err);
            throw err;
        }
    });
};
