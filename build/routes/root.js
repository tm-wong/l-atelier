"use strict";
/**
 * root.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RootRoutes = async (server, 
// eslint-disable-next-line no-unused-vars
opts) => {
    server.get('/', {}, (request, reply) => {
        try {
            return reply.status(200).send({ message: 'Ok' });
        }
        catch (err) {
            request.log.error(err);
            return reply.status(500);
        }
    });
};
exports.default = RootRoutes;
