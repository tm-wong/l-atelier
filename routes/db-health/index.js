'use strict';

const log = require('pino')();
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {
    fastify.get('/', async function(request, reply) {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            const results = { results: (result) ? result.rows : null};
            client.release();
            return results;
        } catch (err) {
            log.error(err);
            reply.status(500);
            return { error: err };
        }
    });
};
