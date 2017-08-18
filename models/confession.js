const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  socialid: String,
  socialnetwork: String,
  message: String,
  uid: String
}, {timestamps: true});
confessionSchema.index({ socialid: 1, message: 1 }, { unique: true });
module.exports = mongoose.model('Confession', confessionSchema);
