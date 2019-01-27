const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  partnerName: { type: String, required: true },
  anniversaryDate: { type: String, required: true },
  birthDate: { type: String, required: true },
  nudges: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Nudge model
      ref: "Nudge"
    }
  ]
});




const User = mongoose.model("User", userSchema);

module.exports = User;
