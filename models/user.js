const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  phone: { type: String },
  partnerName: { type: String },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  anniversaryDate: { type: String },
  birthDate: { type: String },
  nudges: [
    // {
    //   // Store ObjectIds in the array
    //   type: Schema.Types.ObjectId,
    //   // The ObjectIds will refer to the ids in the Nudge model
    //   ref: "Nudge"
    // }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
