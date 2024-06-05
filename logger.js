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

        const parseToJson = (input) => {
            try {
                return JSON.parse(input);
            } catch (error) {
                console.log("couldnt parse")
            }
        }

        return {
            start: (logFileName) => {
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

                const data = {
                    message: "take-off",
                    telemetry: {
                        azimuth: "",
                        alt: "",
                        lat: "",
                        lon: "",
                        pitch: "",
                        roll: "",
                        yaw: ""
                    }
                };

                log(data);
                isRunning = true;
            },
            startService: (service) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                const data = {
                    message: "Started-service",
                    service: service,
                    telemetry: {
                        azimuth: "",
                        alt: "",
                        lat: "",
                        lon: "",
                        pitch: "",
                        roll: "",
                        yaw: ""
                    }
                };

                log(data);
            },
            terminateService: (service) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                const data = {
                    message: "terminated-service",
                    service: service,
                    telemetry: {
                        azimuth: "",
                        alt: "",
                        lat: "",
                        lon: "",
                        pitch: "",
                        roll: "",
                        yaw: ""
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
            detect: (bbox1) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }

                let bbox = "";

                try {
                    bbox = JSON.parse(bbox1);

                } catch (err) {
                    console.log(err);
                }

                const data = {
                    message: "event",
                    // service: service,
                    bbox: {
                        ...bbox
                    },
                    // telemetry: {
                    //     ...telemetry
                    // }
                };

                log(data);
            },

            error: (service, err) => {
                const data = {
                    service: service,
                    message: err,

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
