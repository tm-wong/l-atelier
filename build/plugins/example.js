"use strict";
/**
 * plugin example
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
// eslint-disable-next-line no-unused-vars
const examplePlugin = (0, fastify_plugin_1.default)(async (fastify, opts) => {
    fastify.register(sensible_1.default);
    // eslint-disable-next-line no-unused-vars
    fastify.addHook('onRequest', async (request, reply) => {
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
    });
});
exports.default = examplePlugin;
