# Logger

This module provides a simple logging functionality. It allows you to log messages, errors, and events to a jsonl file.

## Functionalities

- `start(file-name, telemetry: {})` Starts the logger with the specified log file name. Logs a startup message with a timestamp.

- `initiateService(service-name, telemetry: {})` Logs an initiation-service message.

- `terminateService(service-name, telemetry: {})` Logs a termination-service message.

- `error(service-name, error, telemetry: {})` Logs an error message.

- `event(service-name, bbox: {}, telemetry: {})` Logs a detection message.

- `terminate()`: Terminates the logger.


## Usage

```javascript
const Logger = require('logger');
const logger = Logger.getInstance();

// Start the logger
logger.start('file-name', {'telemetry'});

// Initiate a service
logger.initiateService('service-name', {'telemetry'});

// Terminate a service
logger.terminateService('service-name', {'telemetry'});

// Log an error
logger.error('service-name', error, {'telemetry'});

// Log an event
logger.event('service-name', {'bbox'}, {'telemetry'});

// Terminate logger
logger.terminate();
```

## Notes

- The log files are stored in the `logs` directory.
- You must terminate the logger before attempting to start a new one.
- The logger will not start if the file name specified in the `start()` function already exists or is empty.
- All objects must be in a valid JSON format.