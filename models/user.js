const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  phone: {
    type: String,
    validate: {
      validator: async v => {
        const docs = await User.findOne({ phone: v });
        return !docs;
      },
      message: 'Phone number already exists!'
    }
  },
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
