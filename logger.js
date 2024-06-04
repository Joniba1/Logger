const fs = require('fs');
const path = require('path');

const initializeLogger = () => {
    let logPath = '';
    let activeLogger = '';

    const setLogPath = (logFileName) => {
        const logDir = 'logs';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        logPath = path.join(logDir, `${logFileName}.txt`);
    };

    const log = async (msg) => {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Jerusalem',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const logMessage = `[${formattedDate}] ${msg}\n`;

        try {
            await fs.promises.appendFile(logPath, logMessage);
        } catch (err) {
            console.error(err);
        }
    };

    const startLogger = (logFileName) => {
        if (activeLogger !== '' && activeLogger !== logFileName) {
            console.log('A logger is active!\n Make sure to use terminate() before attempting to start a new logger');
            return;
        }

        setLogPath(logFileName);

        if (!logFileName) {
            console.log('A file name is required!');
            return;
        }
        else if (fs.existsSync(logPath)) {
            console.error(`Error: ${logFileName} already exists.`);
            return;
        }

        activeLogger = logFileName;
        log(`Deployed: ${logFileName}`);
    };

    const terminateLogger = () => {
        if (activeLogger !== '' && fs.existsSync(logPath)) {
            log(`Terminated logger`);
            activeLogger = '';
        }
    };

    const alert = (type, detection) => {
        if (!activeLogger) {
            console.error('Error: Logger has not been started.');
            return;
        }

        const logMsg = `${type}: ${detection}`;
        log(logMsg);
    };

    return {
        startLogger,
        terminateLogger,
        alert
    };
};

const loggerInstance = initializeLogger();

const logger = {
    start: (logFileName) => loggerInstance.startLogger(logFileName),
    terminate: () => loggerInstance.terminateLogger(),
    error: (error) => loggerInstance.alert('Error', error),
    detect: (detection) => loggerInstance.alert('Detected', detection)
};

module.exports = logger;
