const winston = require('winston');
const path = require('path');

// Create a custom format for the logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), // Add timestamp
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}` // Customize log format
  )
);

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: customFormat, // Use the custom format
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log to a file
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'app.log'), // Save logs to logs/app.log
      level: 'info', // Log level for the file
      maxsize: 5242880, // 5MB file size limit
      maxFiles: 5, // Keep up to 5 rotated log files
    }),
  ],
});

module.exports = logger;
