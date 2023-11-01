/**
 * plugin example
 */

import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';


// eslint-disable-next-line no-unused-vars
const examplePlugin = fp(async(fastify, opts) => {

	fastify.register(sensible);

	// eslint-disable-next-line no-unused-vars
	fastify.addHook('onRequest', async(request, reply) => {

		const denied = [
			'211.133.33.113',
			// '127.0.0.1'
		];

		const deny = denied.some(d => {
			const exp = new RegExp('^(.*)' + d + '(.*)$');
			return exp.test(request.ip);
		});

		if (deny) {
			throw fastify.httpErrors.forbidden();
		}

		return;
	})
});

export default examplePlugin;
