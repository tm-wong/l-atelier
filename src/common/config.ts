/**
 * config
 */

// logger config
export const logger = {
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

