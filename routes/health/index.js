'use strict';

const assert = require('assert');

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    const { log, httpErrors, errHandler } = fastify;

    fastify.get('/', async function(request, reply) {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM test_table');
            const results = { results: (result) ? result.rows : null};
            client.release();
            assert.strictEqual(results.name, 'hello database');
            return { status: 'OK' };
        } catch (err) {
            log.error(err);
            return errHandler(err, reply);        }
    });
};
