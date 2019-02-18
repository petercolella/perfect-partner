const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nudgeSchema = new Schema({
  name: { type: String, required: true },
  nudgeFrequency: { type: Number, required: true, default: 5000 },
  textMessage: { type: String, default: 'text body' }
});

const Nudge = mongoose.model('Nudge', nudgeSchema);

module.exports = Nudge;
