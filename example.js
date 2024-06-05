const Logger = require('./logger');

const logger = Logger.getInstance();

logger.start('test-1');
logger.detect('{"name": "John", age: 30}');
