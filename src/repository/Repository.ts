/**
 * Repository
 */

import { FastifyInstance } from 'fastify';
import log4js from 'log4js';
import * as pg from 'pg';

export default class Repository {

    log: log4js.Logger;
    db: pg.PoolClient;

    constructor(fastify: FastifyInstance) {
        const { appLog } = fastify;
        this.log = appLog('REPOSITORY');
        this.db = fastify.dbClient();
    }

    get() {}
}
