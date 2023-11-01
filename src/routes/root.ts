/**
 * root.ts
 */

import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyPluginAsync
} from 'fastify';


const RootRoutes: FastifyPluginAsync = async(
	server: FastifyInstance,
	// eslint-disable-next-line no-unused-vars
	opts: FastifyPluginOptions
) => {
	server.get('/', {}, (request, reply) => {
		try {
			return reply.status(200).send({ message: 'Ok' });
		} catch(err) {
			request.log.error(err);
			return reply.status(500);
		}
	});
}

export default RootRoutes;