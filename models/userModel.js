const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'HR', 'IT', 'Sales', 'Operation', 'Account', 'Marketing', 'Legal', 'Procurement'], required: true },
  fcmToken: { type: String } // Add FCM token to the user schema
});

module.exports = mongoose.model('User', userSchema);
