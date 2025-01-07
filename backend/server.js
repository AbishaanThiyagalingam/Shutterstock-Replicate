require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const { getReasonPhrase } = require('./utils/util');
const connectToDatabase = require('./config/database'); // Import database config

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectToDatabase();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'];
  req.traceId = traceId || uuidv4();

  logger.info(
    `(Request Received to Shutterstock-Replicate Service) Trace ID: ${req.traceId} , Method: ${req.method}, URL: ${req.url}, Body Params: ${JSON.stringify(req.body)}`
  );

  const originalEnd = res.end;
  const chunks = [];
  res.write = function (chunk, ...args) {
    chunks.push(chunk);
    originalEnd.apply(res, [chunk, ...args]);
  };
  res.end = function (chunk, ...args) {
    if (chunk) {
      chunks.push(chunk);
    }
    if (res.statusCode >= 400) {
      const body = Buffer.concat(chunks).toString('utf8');
      logger.info(
        `(Response Sent from Shutterstock-Replicate Service) Trace ID: ${req.traceId} , Status Code: ${res.statusCode}, Response Body: ${body}`
      );
    } else {
      logger.info(
        `(Response Sent from Shutterstock-Replicate Service) Trace ID: ${req.traceId} , Status Code: ${res.statusCode}, Status Message: ${getReasonPhrase(
          res.statusCode
        )}`
      );
    }
    originalEnd.apply(res, [chunk, ...args]);
  };

  next();
});

app.use((req, res, _next) => {
  res.status(404).send(req.t('notFound'));
});

app.listen(port, () => {
  logger.info(`Shutterstock-Replicate Server listening on port ${port}`);
});
