const Logger = require('./logger');

const logger = Logger.getInstance();

logger.start('test_1', { 'azimut': 1, 'lan': 1 });
logger.initiateService('service-name', { 'azimut': 1, 'lan': 1 });
logger.error('service-name', 'some-error', { 'azimut': 3, 'lan': 1 });
logger.event('service-name', { 'x': 1, 'y': 1, 'h': 1, 'w': 1 }, { 'azimut': 4, 'lan': 1 });
logger.terminateService('service-name', { 'azimut': 2, 'lan': 1 });
logger.terminate();

logger.start('test_2', { 'azimut': 1, 'lan': 1 });
logger.event('service-name', { 'x': 1, 'y': 1, 'h': 1, 'w': 1 }, { 'azimut': 3 });
