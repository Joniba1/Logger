const fs = require('fs');
const path = require('path');

const Logger = (() => {
    let instance;

    const createInstance = () => {
        let logPath = '';
        let isRunning = false;

        const log = (data) => {
            fs.appendFileSync(logPath, JSON.stringify(data) + '\n');
        };

        function isJSON(obj) {
            try {
                const jsonString = JSON.stringify(obj);
                JSON.parse(jsonString);
                return true;
            } catch (err) {
                return false;
            }
        }

        return {
            start: (logFileName, telemetry) => {
                if (isRunning) {
                    console.log('Logger is already running.');
                    return;
                } else if (!logFileName) {
                    console.log('Specify a file name');
                    return;
                }

                const logDir = 'logs';
                if (!fs.existsSync(logDir)) {
                    fs.mkdirSync(logDir);
                }
                logPath = path.join(logDir, `${logFileName}.jsonl`);

                if (fs.existsSync(logPath)) {
                    // console.log('File name already exists');
                    throw new Error('File name already exists')
                    return;
                }

                const data = {
                    message: "take-off",
                    telemetry: {
                        ...telemetry
                    }
                };

                log(data);
                isRunning = true;
            },
            startService: (service, telemetry) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                if (!service || !telemetry) {
                    console.log("1 or more arguments are missing");
                    return;
                }

                const data = {
                    message: "initiated-service",
                    service: service,
                    telemetry: {
                        ...telemetry
                    }
                };

                log(data);
            },
            terminateService: (service, telemetry) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                if (!service || !telemetry) {
                    console.log("1 or more arguments are missing");
                    return;
                }

                const data = {
                    message: "terminated-service",
                    service: service,
                    telemetry: {
                        ...telemetry
                    }
                };

                log(data);
            },
            terminate: () => {
                if (!isRunning) {
                    console.log('Logger is not running.');
                    return;
                }

                isRunning = false;

                const data = {
                    message: "terminated",
                };

                log(data);

            },
            event: (service, bbox, telemetry) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                if (!service || !bbox || !telemetry) {
                    console.log('1 or more arguments are missing')
                }

                if (!isJSON(bbox) || !isJSON(telemetry)) {
                    console.log("Invalid JSON");
                    return;
                }

                const data = {
                    message: "event",
                    service: service,
                    bbox: {
                        ...bbox
                    },
                    telemetry: {
                        ...telemetry
                    }
                };

                log(data);
            },
            error: (service, err) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                if (!service || !err) {
                    console.log('1 or more arguments are missing')
                }

                const data = {
                    message: 'error',
                    service: service,
                    error: err

                };
                log(data);
            }
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = Logger;
