require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { getReasonPhrase } = require('./utils/util');
const connectToDatabase = require('./config/database');
require('./config/passportConfig');
const authRoutes = require('./routes/AuthRoutes');
const imageRoutes = require('./routes/ImageRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const userHistoryRoutes = require('./routes/UserHistoryRoutes');
const adminRoutes = require('./routes/AdminRoutes');

const app = express();
const port = process.env.PORT || 8080;

connectToDatabase();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Session Configuration
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

// Trace ID Middleware with Safe Response Logging
// app.use((req, res, next) => {
//   const traceId = req.headers['x-trace-id'] || uuidv4();
//   req.traceId = traceId;

//   logger.info({
//     message: 'Request received',
//     traceId,
//     method: req.method,
//     url: req.url,
//     body: req.body,
//   });

//   const originalWrite = res.write;
//   const originalEnd = res.end;
//   const chunks = [];

//   res.write = function (chunk, ...args) {
//     chunks.push(chunk);
//     originalWrite.apply(res, [chunk, ...args]);
//   };

//   res.end = function (chunk, ...args) {
//     if (chunk) {
//       chunks.push(chunk);
//     }

//     const responseBody = Buffer.concat(chunks).toString('utf8');

//     const logDetails = {
//       traceId: req.traceId,
//       method: req.method,
//       url: req.url,
//       statusCode: res.statusCode,
//     };

//     if (res.statusCode >= 400) {
//       logger.error({
//         ...logDetails,
//         message: 'Response sent with error',
//         responseBody,
//       });
//     } else {
//       logger.info({
//         ...logDetails,
//         message: 'Response sent successfully',
//         responseBody,
//       });
//     }

//     originalEnd.apply(res, [chunk, ...args]);
//   };

//   next();
// });

// Define Routes
app.use('/auth', authRoutes);
app.use('/images', imageRoutes);
app.use('/categories', categoryRoutes);
app.use('/history', userHistoryRoutes);
app.use('/admin', adminRoutes);

// Catch 404 Errors
// app.use((req, res) => {
//   res.status(404).json({ message: 'Resource not found' });
// });

// Start the Server
app.listen(port, () => {
  logger.info(`ButterStock-Replicate Server listening on port ${port}`);
});
