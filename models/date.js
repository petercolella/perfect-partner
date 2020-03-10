const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  value: {
    type: Date,
    required: true,
    validate: [
      v => {
        return v !== null;
      },
      'Must be a valid date!'
    ]
  },
  reminders: { type: Array }
});

dateSchema.post('remove', document => {
  const dateId = document._id;
  mongoose
    .model('User')
    .findOneAndUpdate(
      { customDates: { $in: [dateId] } },
      { $pull: { customDates: dateId } },
      { new: true }
    )
    .then(dbModel => console.log(dbModel))
    .catch(err => console.log(err));
});

const customDate = mongoose.model('customDate', dateSchema);

module.exports = customDate;
