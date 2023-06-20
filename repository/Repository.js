'use strict';

module.exports = class Repository {

	constructor(fastify) {
		this.log = fastify.log;
		this.httpErrors = fastify.httpErrors;
		this.db = fastify.dbClient();
	}

	get() {}
};
