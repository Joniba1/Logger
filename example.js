const Logger = require('./logger');

const logger = Logger.getInstance();

logger.start('test-1');
logger.detect('hozi')
logger.detect('sol')
logger.detect('galant')
logger.terminate();
logger.detect('galant')

