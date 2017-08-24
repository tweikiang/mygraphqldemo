const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  count: Number,
  purpose: String
}, {timestamps: true});

module.exports = mongoose.model('Sequence', sequenceSchema);
