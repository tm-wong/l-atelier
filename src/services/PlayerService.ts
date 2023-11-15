/**
 * PlayerService
 */


import log4js from 'log4js';
import { FastifyInstance } from 'fastify';
import { _E_ } from '../common/errors';
import PlayerRepository from '../repository/PlayerRepository';


export default class PlayerService {


    log: log4js.Logger;
    repository: PlayerRepository;

    constructor(fastify: FastifyInstance) {
        const { appLog } = fastify;
        this.log = appLog('REPOSITORY');
        this.repository = new PlayerRepository(fastify);
    }


    async get() {
        return await this.repository.get();
    }


    async getOne(id: number) {
        const results = await this.repository.getOne(id);
        if (!results.length)
            throw new _E_.NOT_FOUND();
        return results;
    }


    async kpis() {
        const results = await this.repository.kpis();
        if (!results.length)
            throw new _E_.NOT_FOUND();
        return results;
    }
}
