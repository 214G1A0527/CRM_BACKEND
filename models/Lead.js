const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  status: {
    connected: { type: Boolean, default: false },
    response: { type: String, enum: ['Discussed', 'Callback', 'Interested', 'Busy', 'RNR', 'Switched Off', ''], default: '' }
  },
  telecaller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
