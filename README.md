# Logger

This module provides a simple logging functionality. It allows you to log messages, errors, and detections to a text file with a timestamp.

<!-- ## Installation

To use this module, install it via npm:

```
npm install my-logger-module
``` -->

## Functionalities

- `start(logFileName)`: Starts the logger with the specified log file name.
- `error(error)`: Logs an error message.
- `detect(detection)`: Logs a detection message.
- `terminate()`: Terminates the logger.


## Usage

```javascript
const logger = require('my-logger-module');

// Start logger with a specific filename
logger.start('file-name');

// Log an error
logger.error(error);

// Log a detection
logger.detect('A detection was made');

// Terminate logger
logger.terminate();
```

## Note

- The log files are stored in the `logs` directory.
- When starting a new logger without terminating the last one, the `terminate()` function will be called automatically.
