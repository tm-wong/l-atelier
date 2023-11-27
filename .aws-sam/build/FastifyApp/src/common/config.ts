/**
 * config
 */


// env
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env.${ process.env.NODE_ENV }` });


// logger config
const loggerConfig = {
    appenders: { console: { type: 'stdout' } },
    categories: {
        default: {
            appenders: [ 'console' ],
            level: 'DEBUG'
        }
    }
};


if (process.env.NODE_ENV === 'dev') {
    loggerConfig.appenders = Object.assign({}, loggerConfig.appenders, {
        system: {
            type: '' + process.env.LOG_TYPE,
            filename: '' + process.env.LOG_FILE_NAME,
            pattern: '' + process.env.LOG_PATTERN
        }
    });

    loggerConfig.categories.default.appenders.push('system');
}

export default loggerConfig;
