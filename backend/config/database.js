// config/database.js
const mongoose = require('mongoose');
const logger = require('../logger');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
