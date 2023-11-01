"use strict";
/**
 * server.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify_1 = require("fastify");
const pino_1 = __importDefault(require("pino"));
const close_with_grace_1 = __importDefault(require("close-with-grace"));
const PORT = parseInt(process.env.PORT, 10) || 7000;
const server = (0, fastify_1.fastify)({
    logger: (0, pino_1.default)({ level: 'debug' })
});
// Register your application
// as a normal plugin.
const app_1 = __importDefault(require("./app"));
server.register(app_1.default);
// delay is the number of milliseconds
// for the graceful close to finish
const closeListeners = (0, close_with_grace_1.default)({
    delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY, 10) || 500
    // eslint-disable-next-line no-unused-vars
}, async function ({ signal, err, manual }) {
    if (err) {
        server.log.error(err);
    }
    await server.close();
});
// close event
server.addHook('onClose', (instance, done) => {
    closeListeners.uninstall();
    done();
});
// start listening
server.listen({
    port: PORT,
    host: process.env.HOST
}, err => {
    if (err) {
        server.log.error(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
    console.log(`server listening on port: ${PORT}`);
});
