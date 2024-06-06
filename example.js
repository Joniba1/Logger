const Logger = require('./logger');

const logger = Logger.getInstance();

logger.start('test-1');
logger.startService('hozi', { "azimut": 1 });
logger.event('service', { "x": 1, "y": 2, "h": 1, "w": 3 }, { "x": 1, "y": 2, "h": 1, "w": 3 });
logger.error('hozi', 'err');
logger.terminateService('hozi', { "azimut": 2 });
logger.terminate();

logger.start('test-2');
logger.event('service', { "x": 1, "y": 2, "h": 1, "w": 3 }, { "x": 1, "y": 2, "h": 1, "w": 3 });
