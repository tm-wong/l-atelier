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
    // eslint-disable-next-line no-unused-vars
    fastify.get('/', {}, async(request, reply) => {

        const log = fastify.appLog('health');

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
    });
};

export default HealthRoutes;
