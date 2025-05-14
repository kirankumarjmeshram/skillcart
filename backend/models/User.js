const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['creator', 'learner'], required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  xp: { type: Number, default: 0 },
  badges: [String],
});

module.exports = mongoose.model('User', userSchema);