const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  dateLost: { type: Date },
  dateFound: { type: Date },
  description: { type: String, required: true },
  imageUrl: { type: String },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  status: { type: String, enum: ['active', 'resolved', 'archived'], default: 'active' },
  type: { type: String, enum: ['lost', 'found'], default: 'lost' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
