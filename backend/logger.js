const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.printf(info => `${info.level}: ${info.message} ${info.timestamp}`)
    ),
    transports: [
        new winston.transports.Console()
    ],
});

module.exports = logger;
