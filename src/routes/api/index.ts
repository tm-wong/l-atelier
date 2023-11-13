/**
 * /api/(.)* (forbidden)
 */
import { FastifyPluginAsync } from 'fastify';

const apiRoot: FastifyPluginAsync = async(
    fastify,
    // eslint-disable-next-line no-unused-vars
    opts
) => {

    // route setup
    const { httpErrors } = fastify;

    // eslint-disable-next-line no-unused-vars
    fastify.get('/:(^[\\w-.]*)', async(request, reply) => {
        throw httpErrors.forbidden();
    });
};

export default apiRoot;
