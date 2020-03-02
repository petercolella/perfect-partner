const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String },
  anniversaryDate: {
    type: Date,
    validate: [
      v => {
        return v !== null;
      },
      'Anniversary must be a valid date!'
    ]
  },
  anniversaryReminders: { type: Array },
  birthDate: {
    type: Date,
    validate: [
      v => {
        return v !== null;
      },
      'Birthday must be a valid date!'
    ]
  },
  birthdayReminders: { type: Array },
  partnerName: {
    type: String,
    default: '',
    maxlength: [50, 'Partner name may not exceed 50 characters!']
  },
  phone: {
    type: String,
    default: '',
    validate: {
      validator: async v => {
        const docs = await User.findOne({ phone: v });
        return !docs;
      },
      message: 'Phone number already exists!'
    }
  },
  nudges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Nudge'
    }
  ]
});

userSchema.post('remove', document => {
  document.nudges.forEach(id => {
    mongoose
      .model('Nudge')
      .findOneAndDelete({ _id: id })
      .then(dbModel => console.log(dbModel))
      .catch(err => console.log(err));
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
