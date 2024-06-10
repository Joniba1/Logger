# Logger

This module provides a simple logging functionality. It allows you to log messages, errors, and events to a jsonl file.

## Functionalities

- `start(file_name, { telemetry })` Starts the logger with the specified log file name. Logs a startup message with a timestamp.

- `initiateService(service-name, { telemetry })` Logs an initiation-service message.

- `terminateService(service-name, { telemetry })` Logs a termination-service message.

- `error(service_name, error, { telemetry })` Logs an error message.

- `event(service_name, { bbox }, { telemetry })` Logs a detection message.

- `terminate()`: Terminates the logger.


## Usage (JS)

```javascript
const Logger = require('logger');
const logger = Logger.getInstance();

// Start the logger
logger.start('file-name', {'telemetry'});

// Initiate a service
logger.initiateService('service-name', {'telemetry'});

// Terminate a service
logger.terminateService('service-name', {'telemetry'});

// Log an event
logger.event('service-name', {'bbox'}, {'telemetry'});

// Log an error
logger.error('service-name', error, {'telemetry'});

// Terminate logger
logger.terminate();
```


## Usage (Python)

```python
from logger_python import Logger

def main():
    logger = Logger()

    # Start the logger
    logger.start('file-name', {'telemetry'})

    # Initiate a service
    logger.initiate_service('service-name', {'telemetry'})

    # Terminate a service
    logger.terminate_service('service-name', {'telemetry'})

    # Log an event
    logger.event('service-name', {'bbox': 'value'}, {'telemetry': 'value'})

    # Log an error
    logger.error('service-name', error, {'telemetry'});

    # Terminate logger
    logger.terminate()

if __name__ == '__main__':
    main()
```

## Notes

- The log files are stored in the `logs` directory.
- You must terminate the logger before attempting to start a new one.
- The logger will not start if the file name specified in the `start()` function already exists or is empty.
- All objects must be in a valid JSON format.