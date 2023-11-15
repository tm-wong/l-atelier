/**
 * database.ts
 */


// dependencies
import fp from 'fastify-plugin';
import getLogger from '../../common/log';
import { _E_ } from '../../common/errors';

import {
    PoolConfig,
    Pool
} from 'pg';


// log instance
const log = getLogger('DATABASE');


// database connection parameters
// 1 - environment based parameters
const {
    NODE_ENV : env,
    DATABASE_URL,
    DATABASE_SSL
} = process.env;


// 2 - SSL configuration
const ssl = Number(DATABASE_SSL) === 1 && true || false;

const dbConnSsl = (
    env === 'dev' ||
    env === 'production'
) && { rejectUnauthorized: ssl } || ssl;

const opts: PoolConfig = {
    connectionString: '' + DATABASE_URL,
    ssl: dbConnSsl
};

// 3 - pool instance
const pool: Pool = new Pool(opts);


// database access connection
const connect = async() => {

    // this is so specific connexion error,
    // if any, is logged and displayed specically
    try {
        return await pool.connect();
    } catch(err) {
        log.error(err);
        throw new _E_.DATABASE_CONNEXION();
    }
};


/**
 * Database Plugin:
 * this plugin is a database connection
 * and database query wrapper
 */
export default fp(async(
    fastify,
    // eslint-disable-next-line no-unused-vars
    opts
) => {

    fastify.decorate('dbClient', () => {


        // database query wrapper
        const query = async(sql: string, params: [] = []) => {

            // connexion
            const client = await connect();

            try {

                // query
                const result = await client.query(sql, params);

                // result format
                const content = (result) ? result.rows : null;

                // output
                return content;

            } catch (err) {

                log.error(err);

                // Database Query Error
                // accepts SQL and query parameters
                // as parameters in order to
                // display them in logs
                throw new _E_.DATABASE_QUERY(null, sql, params);

            } finally {

                // client release for
                // connexion to remain
                // available for other
                // database queries
                client.release();

            }
        };

        return { query };

    });
});
