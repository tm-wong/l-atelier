import * as log4js from 'log4js';
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';


const opts: log4js.Configuration = {
    appenders: {
        console: {
            type: 'stdout'
        },
        system: {
            type: '' + process.env.LOG_TYPE,
            filename: '' + process.env.LOG_FILE_NAME,
            pattern: '' + process.env.LOG_PATTERN
        }
    },
    categories: {
        default: {
            appenders: [ 'console', 'system' ],
            level: 'DEBUG'
        }
    }
};

log4js.configure(opts);

export default fp(
    async(
        fastify: FastifyInstance,
        // eslint-disable-next-line no-unused-vars
        options: FastifyPluginOptions
    ) => {
        fastify.decorate(
            'appLog',
            (logIdentifier: string) => log4js.getLogger(logIdentifier)
        );
    }
);
