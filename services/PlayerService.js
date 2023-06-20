'use strict';


const PlayerRepository = require('../repository/PlayerRepository');

module.exports = class PlayerService {

	constructor(fastify) {
		this.httpErrors = fastify.httpErrors;
		this.repository = new PlayerRepository(fastify);
	}

	async get() {
		return await this.repository.get();		
	}

	async getOne(id) {
		const results = await this.repository.getOne(id);
		if (!results?.[0])
			throw this.httpErrors.notFound();
		return results[0];
	}

	async kpis() {
		const results = await this.repository.kpis();		
		if (!results?.[0])
			throw this.httpErrors.notFound();
		return results[0];
	}
};
