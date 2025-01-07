const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'buyer' }, // Default role is 'buyer'
  verificationStatus: { type: String, default: 'pending' }, // For seller verification
});

module.exports = mongoose.model('User', userSchema);
