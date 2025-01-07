require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { getReasonPhrase } = require('./utils/util');
const connectToDatabase = require('./config/database'); // Import database config
require('./config/passportConfig'); // Import passport configuration
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = process.env.PORT || 8080;

connectToDatabase();


// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Trace ID middleware
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

// Auth routes for Google Login and role-based services
app.use('/auth', authRoutes);

// Catch 404 errors
app.use((req, res, _next) => {
  res.status(404).send(req.t('notFound'));
});

// Start the server
app.listen(port, () => {
  logger.info(`Shutterstock-Replicate Server listening on port ${port}`);
});
