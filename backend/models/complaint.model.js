const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  priority: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['New', 'open', 'in_progress', 'closed'],
    default: 'New'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
