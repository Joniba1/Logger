const fs = require('fs');
const path = require('path');

const Logger = (() => {
    const createInstance = () => {
        let logPath = '';
        let isRunning = false;
        let isLogging = false;
        const logQueue = [];
        let storageAvailable = true;

        const log = async (data) => {
            if (!storageAvailable) {
                console.log('Storage is full');
                return;
            }

            logQueue.push(data);

            if (!isLogging) {
                isLogging = true;
                while (logQueue.length > 0) {
                    const logItem = logQueue.shift();
                    try {
                        await fs.promises.appendFile(logPath, JSON.stringify(logItem) + '\n');
                    } catch (err) {
                        if (err.code === 'ENOSPC') {
                            storageAvailable = false;
                            console.log('Storage is full');
                        } else {
                            console.error(err);
                        }
                    }
                }
                isLogging = false;
            }
        };

        const isJSON = (obj) => {
            try {
                const jsonString = JSON.stringify(obj);
                JSON.parse(jsonString);
                return true;
            } catch (err) {
                return false;
            }
        }

        const logging = async () => {
            await new Promise(resolve => {
                const checkLogging = setInterval(() => {
                    if (!isLogging) {
                        clearInterval(checkLogging);
                        resolve();
                    }
                }, 50);
            });
        };

        return {
            terminate: async () => {
                await logging();

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
            start: async (logFileName, telemetry) => {
                await logging();

                if (isRunning) {
                    console.log('Terminate the logger before starting a new one');
                    return;
                }
                else if (!logFileName || !telemetry) {
                    console.log('1 or more arguments are missing');
                    return;
                }
                else if (!isJSON(telemetry)) {
                    console.log("Invalid JSON");
                    return;
                }

                const logDir = 'logs';

                if (!fs.existsSync(logDir)) {
                    fs.mkdirSync(logDir);
                }

                logPath = path.join(logDir, `${logFileName}.jsonl`);

                if (fs.existsSync(logPath)) {
                    console.log('File name already exists');
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
            initiateService: async (service, telemetry) => {
                await logging();

                if (!isRunning) {
                    console.log('You must initialize a logger');
                    return;
                }
                else if (!service || !telemetry) {
                    console.log("1 or more arguments are missing");
                    return;
                }
                else if (!isJSON(telemetry)) {
                    console.log('    JSON');
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
            terminateService: async (service, telemetry) => {
                await logging();

                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }
                else if (!service || !telemetry) {
                    console.log("1 or more arguments are missing");
                    return;
                }
                else if (!isJSON(telemetry)) {
                    console.log("Invalid JSON");
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
            event: async (service, bbox, telemetry) => {
                await logging();

                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }
                else if (!service || !bbox || !telemetry) {
                    console.log('1 or more arguments are missing')
                }
                else if (!isJSON(bbox) || !isJSON(telemetry)) {
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
            error: async (service, err, telemetry) => {
                await logging();

                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }
                else if (!service || !err) {
                    console.log('1 or more arguments are missing')
                }
                else if (!isJSON(telemetry)) {
                    console.log("Invalid JSON");
                    return;
                }

                const data = {
                    message: 'error',
                    service: service,
                    error: err,
                    telemetry: {
                        ...telemetry
                    }

                };
                log(data);
            }
        };
    };

    const instance = createInstance();
    return {
        getInstance: () => instance
    };
})();

module.exports = Logger;
