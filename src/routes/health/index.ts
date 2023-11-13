/**
 * health.ts
 */
import assert from 'assert';
import { FastifyPluginAsync } from 'fastify';

/**
 * this is healthcheck route
 * 1 - API routing system
 * 2 - database access
 */
const healthRoutes: FastifyPluginAsync = async(
    fastify,
    // eslint-disable-next-line no-unused-vars
    opts
) => {

    // eslint-disable-next-line no-unused-vars
    fastify.get('/', {}, async(request, reply) => {

        let database = 0;
        const log = fastify.appLog('health');


        try {
            // get client from connexion pool
            const db = fastify.dbClient();

            // actual query
            const sql = 'SELECT * FROM test_table';
            const content = await db.query(sql);

            // asserts results
            assert.strictEqual(content[0]?.name, 'hello database');

            // set status
            database = 1;
        } catch(err) {
            log.error(err);
        }

        // Confirmation du statut
        return { status: { router: 1, database } };
    });
};

export default healthRoutes;
