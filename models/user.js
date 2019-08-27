const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: { type: String },
  partnerName: { type: String },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  anniversaryDate: { type: Date },
  birthDate: { type: Date },
  nudges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Nudge'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
