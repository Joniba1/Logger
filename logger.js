const fs = require('fs');
const path = require('path');

const Logger = (() => {
    let instance;
    let timer;
    let logQueue = Promise.resolve();

    const createInstance = () => {
        let logPath = '';
        let isRunning = false;

        const log = (data) => {
            logQueue = logQueue.then(() => {
                return new Promise((resolve, reject) => {
                    fs.appendFile(logPath, JSON.stringify(data) + '\n', (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });
        };

        return {
            start: async (logFileName) => {
                const logDir = 'logs';
                if (!fs.existsSync(logDir)) {
                    fs.mkdirSync(logDir);
                }

                logPath = path.join(logDir, `${logFileName}.jsonl`);

                const data = {
                    message: "deployment",
                    timestamp: "00:00:00",
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
                timer = new Date();
                isRunning = true;
            },
            terminate: () => {
                isRunning = false;
                const diff = new Date() - timer;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                const data = {
                    message: "terminated",
                    timestamp: formattedTime
                }

                log(data);
            },
            detect: (service) => {
                if (!isRunning) {
                    console.log('You must initialize the logger');
                    return;
                }
                const diff = new Date() - timer;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                const data = {
                    message: "detection",
                    service: service,
                    timestamp: formattedTime,
                    detection: {
                        x: "",
                        y: "",
                        w: "",
                        h: ""
                    },
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
            error: (err) => {
                const data = {
                    message: err,
                    service: ""
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
