const Logger = require('./logger');

const logger = Logger.getInstance();

//test-1
logger.start('test-1', { "x": 1 });
logger.initiateService('hozi', { "azimut": 1 });
logger.event('1', { "x": 1, "y": 2, "h": 1, "w": 3 }, { "x": 1, "y": 2, "h": 1, "w": 3 });
logger.error('hozi' ,'I`m an error');
logger.terminateService('hozi', { "azimut": 1 });
logger.terminate();

//test-2
logger.start('test-2', { "x": 1 });
logger.event('service', { "x": 1, "y": 2, "h": 1, "w": 3 }, { "x": 1, "y": 2, "h": 1, "w": 3 });
