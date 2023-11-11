/**
 * log.ts
 */

// log set up
import * as log4js from 'log4js';
import { logger as config } from './config';
const opts: log4js.Configuration = config;

log4js.configure(opts);

export default (logIdentifier: string) => log4js.getLogger(logIdentifier);
