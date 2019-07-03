const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nudgeSchema = new Schema({
  name: { type: String, required: true },
  nudgeFrequency: { type: Number, required: true, default: 7 },
  nudgeFrequencyUnit: {
    type: String,
    required: true,
    default: 'days',
    enum: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
  },
  textMessage: { type: String, default: 'text body' },
  activated: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Nudge = mongoose.model('Nudge', nudgeSchema);

module.exports = Nudge;
