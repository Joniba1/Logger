const fs = require('fs');
const path = require('path');

let logPath = '';
let activeLogger = '';

const logger = {
    start: (logFileName) => startLogger(logFileName),
    terminate: () => terminateLogger(),
    error: (error) => alert('Error', error),
    detect: (detection) => alert('Detected', detection)
};

const setLogPath = (logFileName) => {
    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    logPath = path.join(logDir, `${logFileName}.txt`);
};

//Logs a timestamp and a msg
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
        await fs.promises.appendFile(logPath, logMessage, 'utf-8');
    } catch (err) {
        console.error(err);
    }
};

const startLogger = (logFileName) => {
    //terminates any active loggers
    if (activeLogger !== '' && activeLogger !== logFileName) {
        terminateLogger();
    }

    setLogPath(logFileName);

    //Checks whether or not the file name already exists
    if (fs.existsSync(logPath)) {
        console.error(`Error: ${logFileName} already exists.`);
        return;
    }

    activeLogger = logFileName;
    log(`Deployed: ${logFileName}`); //Also creates the file
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


module.exports = logger;