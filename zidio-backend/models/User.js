const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: false },
  phone:     { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, 
    freeTrialUsed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
