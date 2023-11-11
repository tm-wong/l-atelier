/**
 * database.ts
 */

// dependencies
import fp from 'fastify-plugin';
import getLogger from '../../common/log';

import {
    E_DATABASE_CONNEXION,
    E_DATABASE_QUERY
} from '../../common/errors';

import {
    FastifyInstance,
    FastifyPluginOptions
} from 'fastify';

import {
    PoolConfig,
    Pool,
    PoolClient
} from 'pg';

// log instance
const log = getLogger('DATABASE');

// database connection parameters
const {
    DATABASE_URL,
    DATABASE_SSL
} = process.env;

const opts: PoolConfig = {
    connectionString: '' + DATABASE_URL,
    ssl: { rejectUnauthorized: Number(DATABASE_SSL) === 1 && true || false }
};


// pool instance
const pool: Pool = new Pool(opts);

// database access
// through connection
const connect = async(): Promise<{
    client?: PoolClient;
    err?: Error | unknown;
}> => {
    const client: PoolClient = await pool.connect();
    return { client };
};


/**
 * Database Plugin:
 * this plugin is a database connection
 * and database query wrapper
 */
export default fp(async(
    fastify: FastifyInstance,
    // eslint-disable-next-line no-unused-vars
    opts: FastifyPluginOptions
) => {

    fastify.decorate('dbClient', () => {

        // database query wrapper
        const query = async(sql: string, params: any = []) => {

            try {
                // connexion
                const { client } = await connect();

                // connexion check
                if (!client) {
                    throw new E_DATABASE_CONNEXION();
                }

                // query
                const result = await client.query(sql, params);

                // result format
                const content = (result) ? result.rows : null;

                // client release for
                // connexion to remain
                // available for other
                // database queries
                client.release();

                // output
                return content;

            } catch (err) {
                log.error(err);
                if (!err as any instanceof E_DATABASE_CONNEXION)
                    throw new E_DATABASE_QUERY(null, sql, params);
                throw err;
            }
        };

        return { query };

    });
});