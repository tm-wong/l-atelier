/**
 * health.ts
 */
import assert from 'assert';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyPluginAsync
} from 'fastify';


/**
 * Cette route permet de vérifier
 * que les fonctionnalités
 * de base de l'API sont up
 */
const HealthRoutes: FastifyPluginAsync = async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    opts: FastifyPluginOptions
) => {
    fastify.get('/', {}, async(request, reply) => {

        const log = fastify.appLog('health');

        try {
            // Récupération du client du pool de connexion
            const db = fastify.dbClient();

            // Requête
            const sql = 'SELECT * FROM test_table';
            const content = await db.query(sql);
            log.debug('=== content', content);

            // Vérification des résultats
            assert.strictEqual(content[0]?.name, 'hello database');

            // Confirmation du statut
            return { status: 'OK' };

        } catch(err) {
            log.error(err);
            return reply.status(500);
        }
    });
}

export default HealthRoutes;

/*
// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    const { log, dbClient } = fastify;

    fastify.get('/', async function(request, reply) {

        try {
            // Récupération du client du pool de connexion
            const db = dbClient();

            // Requête
            const sql = 'SELECT * FROM test_table';
            const content = await db.query(sql);

            // Vérification des résultats
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
*/