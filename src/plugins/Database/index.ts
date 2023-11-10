import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Pool, PoolConfig } from 'pg';
import * as errors from '../../errors';

const opts: PoolConfig = {
	connectionString: '' + process.env.DATABASE_URL,
	connectionTimeoutMillis: Number(process?.env?.DATABASE_TIMEOUT),
	idleTimeoutMillis: Number(process?.env?.DATABASE_IDLE_TIMEMOUT),
	max: Number(process?.env?.DATABASE_MAX),
	allowExitOnIdle: Boolean(process?.env?.DATABASE_ALLOW_EXIT_ON_IDLE),
	maxUses: Number(process?.env?.DATABASE_MAX_USES),
	ssl: { rejectUnauthorized: false }
};

const pool = new Pool(opts);

/*
export default fp(async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    options: FastifyPluginOptions
) => {
    fastify.decorate('environment', () => {
        const env: string = process.env.NODE_ENV || 'production';
        // eslint-disable-next-line no-console
        console.log('=== env', env);
        return env;
    });
});

*/

/**
 * Ce plugin est un utilitaire
 * de connexion à la base de données
 */
// eslint-disable-next-line no-unused-vars
export default fp(async(
	fastify: FastifyInstance,
	// eslint-disable-next-line no-unused-vars
	opts: FastifyPluginOptions
) => {

    fastify.decorate('dbClient', () => {

        const query = async(sql: string, params = []) => {


            // Récupération d'un client depuis le pool
            // de connexions à la base de données
            const client = await pool.connect();


            try {
                // Requête
                const result = await client.query(sql, params);

                // Formattage des résultats
                const content = (result) ? result.rows : null;

                // Remise à disposition du client
                // pour les autres connexions
                // à la base de données
                client.release();

                // Output
                return content;

            } catch (err) {
                // Traitement des erreurs
                // log.error('Error: database query failed');
                // log.error('SQL: ' + sql);
                // log.error('PARAMS ' + JSON.stringify(params));
                // log.error(err);
                throw err;
            }
        };

        return { query };

    });
});
