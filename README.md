# Logger

This module provides a simple logging functionality. It allows you to log messages, errors, and detections to a text file with a timestamp.

## Functionalities

- `start(logFileName)`: Starts the logger with the specified log file name. Logs a startup message with a timestamp.
- `error(error)`: Logs an error message with a timestamp.
- `detect(detection)`: Logs a detection message with a timestamp.
- `terminate()`: Terminates the logger. Logs a termination message with a timestamp.


## Usage

```javascript
const logger = require('my-logger-module');

// Start logger with a specific filename
logger.start('file-name');

// Log an error
logger.error(error);

// Log a detection
logger.detect('detection');

// Terminate logger
logger.terminate();
```

## Note

- The log files are stored in the `logs` directory.
- You must terminate the logger before attempting to start a new one.
- The logger will not start if the file name specified in the `start()` function already exists or is empty.